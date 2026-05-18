// auth.js

document.addEventListener("DOMContentLoaded", () => {
    const nameInput = document.getElementById("nameInput");
    const passwordInput = document.getElementById("passwordInput");
    const loginBtn = document.getElementById("loginBtn");
    const errorText = document.getElementById("errorText");
    const forgotPasswordLink = document.getElementById("forgotPasswordLink");
    const createAccountBtn = document.getElementById("createAccountBtn");
    const authConfig = {
        defaultPassword: "1234",
        users: {}
    };
    const staticConfig = window.EMERALD_AUTH || {};
    if (staticConfig.defaultPassword) {
        authConfig.defaultPassword = String(staticConfig.defaultPassword);
    }
    if (staticConfig.users && typeof staticConfig.users === "object") {
        const normalizedUsers = {};
        Object.keys(staticConfig.users).forEach((name) => {
            normalizedUsers[String(name).toLowerCase()] = String(staticConfig.users[name]);
        });
        authConfig.users = normalizedUsers;
    }

    if (App.isLoggedIn()) {
        window.location.href = "htmls/dashboard.html";
    }

    loginBtn.addEventListener("click", handleLogin);

    forgotPasswordLink.addEventListener("click", (event) => {
        event.preventDefault();
        errorText.textContent = "Please contact the Emerald admin or your teacher to reset your password.";
    });

    createAccountBtn.addEventListener("click", () => {
        errorText.textContent = "Account creation is handled by the Emerald admin or teacher.";
    });

    loadAuthConfigFromEnv();

    async function loadAuthConfigFromEnv() {
        try {
            const response = await fetch(".env", { cache: "no-store" });
            if (!response.ok) return;
            const text = await response.text();
            const env = parseEnvText(text);

            if (env.AUTH_DEFAULT_PASSWORD) {
                authConfig.defaultPassword = env.AUTH_DEFAULT_PASSWORD;
            }

            const usersFromEnv = parseUsers(env.AUTH_USERS || "");
            if (Object.keys(usersFromEnv).length > 0) {
                authConfig.users = usersFromEnv;
            }
        } catch {
          
        }
    }

    function parseEnvText(text) {
        const out = {};
        String(text || "")
            .split(/\r?\n/)
            .forEach((rawLine) => {
                const line = rawLine.trim();
                if (!line || line.startsWith("#")) return;
                const idx = line.indexOf("=");
                if (idx === -1) return;
                const key = line.slice(0, idx).trim();
                const value = line.slice(idx + 1).trim();
                out[key] = value;
            });
        return out;
    }

    function parseUsers(raw) {
        const users = {};
        String(raw || "")
            .split(",")
            .map((entry) => entry.trim())
            .filter(Boolean)
            .forEach((entry) => {
                const separator = entry.indexOf(":");
                if (separator === -1) return;
                const userName = entry.slice(0, separator).trim();
                const password = entry.slice(separator + 1).trim();
                if (!userName || !password) return;
                users[userName.toLowerCase()] = password;
            });
        return users;
    }

    function isLoginValid(name, password) {
        const configuredUsers = authConfig.users || {};
        const hasConfiguredUsers = Object.keys(configuredUsers).length > 0;

        if (hasConfiguredUsers) {
            const expectedPassword = configuredUsers[name.toLowerCase()];
            return Boolean(expectedPassword) && expectedPassword === password;
        }

        return password === authConfig.defaultPassword;
    }

    async function handleLogin() {
        const name = nameInput.value.trim();
        const password = passwordInput.value.trim();

        errorText.textContent = "";

    
        if (!name) {
            errorText.textContent = "Enter your name.";
            return;
        }

        if (!password) {
            errorText.textContent = "Enter password.";
            return;
        }

     
        if (!isLoginValid(name, password)) {
            errorText.textContent = "Wrong password.";
            return;
        }

        loginBtn.disabled = true;
        const originalLoginLabel = loginBtn.textContent;
        loginBtn.textContent = "Logging in...";

        try {
            let sharedUser = {
                id: App.createStableUserId(name),
                name: name,
                email: ""
            };

            if (window.EmeraldFirebase) {
                sharedUser = await EmeraldFirebase.signInWithNameAndPassword(name, password);
            }

            App.login({
                id: sharedUser?.uid || sharedUser?.id || App.createStableUserId(name),
                name: sharedUser?.name || name,
                email: sharedUser?.email || ""
            });

            localStorage.setItem("emerald_post_login_sync_pending", "1");

            window.location.href = "htmls/dashboard.html";
        } catch (error) {
            console.error("Login failed:", error);
            errorText.textContent = "Login failed. Check the name/password and try again.";
        } finally {
            loginBtn.disabled = false;
            loginBtn.textContent = originalLoginLabel;
        }
    }
});
