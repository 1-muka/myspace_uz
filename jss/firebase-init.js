(function (global) {
    "use strict";

    if (global.EmeraldFirebase) {
        return;
    }

    var firebaseSdk = global.firebase;
    if (!firebaseSdk) {
        console.warn("Firebase SDK is not loaded. Falling back to local storage.");
        return;
    }

    var REAUTH_KEY = "emerald_firebase_reauth";

    var firebaseConfig = {
        apiKey: "AIzaSyD7horWxETc32bwnZNM9s_3xpNKmxGM0RQ",
        authDomain: "emerald-21841.firebaseapp.com",
        projectId: "emerald-21841",
        storageBucket: "emerald-21841.firebasestorage.app",
        messagingSenderId: "425566763496",
        appId: "1:425566763496:web:e58f4db5086976b3718c5d"
    };

    if (!firebaseSdk.apps.length) {
        firebaseSdk.initializeApp(firebaseConfig);
    }

    var auth = firebaseSdk.auth();
    var firestore = firebaseSdk.firestore();

    auth.setPersistence(firebaseSdk.auth.Auth.Persistence.LOCAL).catch(function (error) {
        console.warn("Firebase auth persistence setup failed:", error);
    });

    function normalizeName(value) {
        return String(value || "")
            .trim()
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, ".")
            .replace(/^\.+|\.+$/g, "") || "student";
    }

    function buildEmailFromName(name) {
        return normalizeName(name) + "@emerald.local";
    }

    function buildFirebasePassword(password) {
        return "emerald@" + String(password || "");
    }

    function formatAuthUser(user, fallbackName) {
        if (!user) {
            return null;
        }

        var name = String(user.displayName || fallbackName || "Student").trim() || "Student";

        return {
            uid: user.uid,
            email: String(user.email || buildEmailFromName(name)).trim(),
            name: name
        };
    }

    function rememberAuthSession(name, password) {
        try {
            global.sessionStorage.setItem(REAUTH_KEY, JSON.stringify({
                name: String(name || "").trim(),
                password: String(password || "")
            }));
        } catch (error) {
            console.warn("Could not remember Firebase auth session:", error);
        }
    }

    function clearAuthSession() {
        try {
            global.sessionStorage.removeItem(REAUTH_KEY);
        } catch (error) {
            // ignore
        }
    }

    function readAuthSession() {
        try {
            return JSON.parse(global.sessionStorage.getItem(REAUTH_KEY) || "null");
        } catch {
            return null;
        }
    }

    function waitForAuth(timeoutMs) {
        return new Promise(function (resolve) {
            var settled = false;

            function done(user) {
                if (settled) {
                    return;
                }
                settled = true;
                resolve(user || null);
            }

            var timer = setTimeout(function () {
                unsub();
                done(auth.currentUser);
            }, Math.max(500, timeoutMs || 4000));

            var unsub = auth.onAuthStateChanged(function (user) {
                if (user) {
                    clearTimeout(timer);
                    unsub();
                    done(user);
                }
            });
        });
    }

    async function signInWithNameAndPassword(name, password) {
        var safeName = String(name || "").trim() || "Student";
        var email = buildEmailFromName(safeName);
        var sharedPassword = buildFirebasePassword(password);
        var methods = [];

        try {
            methods = await auth.fetchSignInMethodsForEmail(email);
        } catch (error) {
            console.warn("Could not fetch sign-in methods for", email, error);
        }

        var credential;
        if (Array.isArray(methods) && methods.length > 0) {
            credential = await auth.signInWithEmailAndPassword(email, sharedPassword);
        } else {
            try {
                credential = await auth.createUserWithEmailAndPassword(email, sharedPassword);
            } catch (error) {
                if (error && error.code === "auth/email-already-in-use") {
                    credential = await auth.signInWithEmailAndPassword(email, sharedPassword);
                } else {
                    throw error;
                }
            }
        }

        if (credential && credential.user && credential.user.displayName !== safeName) {
            await credential.user.updateProfile({ displayName: safeName });
        }

        rememberAuthSession(safeName, password);
        return formatAuthUser(credential && credential.user, safeName);
    }

    async function ensureAuthSession() {
        if (auth.currentUser) {
            return formatAuthUser(auth.currentUser);
        }

        var restored = await waitForAuth(4000);
        if (restored) {
            return formatAuthUser(restored);
        }

        var saved = readAuthSession();
        if (saved && saved.name && saved.password) {
            try {
                return await signInWithNameAndPassword(saved.name, saved.password);
            } catch (error) {
                console.error("Firebase re-auth failed:", error);
                clearAuthSession();
            }
        }

        return null;
    }

    async function signOut() {
        clearAuthSession();
        await auth.signOut();
    }

    global.EmeraldFirebase = {
        config: firebaseConfig,
        app: firebaseSdk.app(),
        auth: auth,
        firestore: firestore,
        buildEmailFromName: buildEmailFromName,
        buildFirebasePassword: buildFirebasePassword,
        formatAuthUser: formatAuthUser,
        rememberAuthSession: rememberAuthSession,
        clearAuthSession: clearAuthSession,
        waitForAuth: waitForAuth,
        ensureAuthSession: ensureAuthSession,
        signInWithNameAndPassword: signInWithNameAndPassword,
        signOut: signOut
    };
})(window);
