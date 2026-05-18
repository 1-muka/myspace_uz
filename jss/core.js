// core.js
function emeraldLoginHref() {
    const p = String(window.location.pathname || "");
    return /\/htmls(\/|$)/.test(p) ? "../index.html" : "index.html";
}

const App = {
    createStableUserId(name) {
        const base = String(name || "student")
            .trim()
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "") || "student";
        return `user_${base}`;
    },

    login(input) {
        const previous = this.getUser() || {};
        const source = typeof input === "object" && input !== null ? input : { name: input };
        const name = String(source.name || previous.name || "Student").trim() || "Student";
        const email = String(source.email || previous.email || "").trim();
        const userId = String(source.id || previous.id || this.createStableUserId(name)).trim();
        const user = {
            id: userId,
            name: name,
            email: email,
            token: "logged_in_" + Date.now()
        };
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("userName", name);
    },

    async logout() {
        if (window.EmeraldFirebase && typeof window.EmeraldFirebase.signOut === "function") {
            try {
                await window.EmeraldFirebase.signOut();
            } catch (error) {
                console.warn("Firebase sign-out failed:", error);
            }
        }
        localStorage.removeItem("user");
        localStorage.removeItem("userName");
        window.location.href = emeraldLoginHref();
    },

    getUser() {
        return JSON.parse(localStorage.getItem("user"));
    },

    isLoggedIn() {
        return !!localStorage.getItem("user");
    },

    requireAuth() {
        if (!this.isLoggedIn()) {
            window.location.href = emeraldLoginHref();
        }
    },

    preventInputHistory(root = document) {
        const scope = root && root.querySelectorAll ? root : document;
        const fields = scope.querySelectorAll('input:not([type="checkbox"]):not([type="radio"]):not([type="file"]), textarea');
        const pageKey = window.location.pathname.replace(/[^a-z0-9]+/gi, "_");

        fields.forEach((field, index) => {
            field.setAttribute("autocomplete", "off");
            field.setAttribute("autocorrect", "off");
            field.setAttribute("autocapitalize", "off");
            field.setAttribute("spellcheck", "false");
            field.setAttribute("data-lpignore", "true");

            if (field.tagName === "INPUT" && field.type === "password") {
                field.setAttribute("autocomplete", "new-password");
            }

            if (!field.name) {
                const baseId = field.id ? field.id : `field_${index + 1}`;
                field.name = `${pageKey}_${baseId}`;
            }
        });

        const forms = scope.querySelectorAll("form");
        forms.forEach((form) => form.setAttribute("autocomplete", "off"));
    },

    initNoAutocompleteObserver() {
        if (this._inputHistoryObserverStarted) return;
        this._inputHistoryObserverStarted = true;

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (!(node instanceof Element)) return;
                    this.preventInputHistory(node);
                });
            });
        });

        observer.observe(document.body, { childList: true, subtree: true });
        this._inputHistoryObserver = observer;
    }
};

document.addEventListener("DOMContentLoaded", () => {
    App.preventInputHistory(document);
    App.initNoAutocompleteObserver();
});
