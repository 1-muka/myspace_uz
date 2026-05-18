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

        return formatAuthUser(credential && credential.user, safeName);
    }

    async function signOut() {
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
        signInWithNameAndPassword: signInWithNameAndPassword,
        signOut: signOut
    };
})(window);
