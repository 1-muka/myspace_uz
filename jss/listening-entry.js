// listening-entry.js

let selectedTest = null;

const accessCodes = {
    test1: "EMERALD1",
    test2: "EMERALD2",
    test3: "EMERALD3",
    test4: "EMERALD4",
    test5: "EMERALD5",
    test6: "EMERALD6",
    test7: "EMERALD7",
    test8: "EMERALD8"
};

const testRoutes = {
    test1: "listening-test1.html",
    test2: "listening-test2.html",
    test3: "listening-test3.html",
    test4: "listening-test4.html",
    test5: "listening-test5.html",
    test6: "listening-test6.html",
    test7: "listening-test7.html",
    test8: "listening-test8.html"
};

document.addEventListener("DOMContentLoaded", () => {
    App.requireAuth();

    document.getElementById("logoutBtn").addEventListener("click", () => {
        App.logout().catch(console.error);
    });
});

function goBack() {
    window.location.href = "dashboard.html";
}

function openModal(testId) {
    selectedTest = testId;
    document.getElementById("modal").classList.remove("hidden");
}

function startTest() {
    const name          = document.getElementById("nameInput").value.trim();
    const code          = document.getElementById("accessCodeInput").value.trim();
    const typed         = document.getElementById("agreementInput").value.trim();
    const required      = document.getElementById("requiredPhrase").textContent.trim();
    const errorEl       = document.getElementById("modalError");

    errorEl.textContent = "";

    if (!name) {
        errorEl.textContent = "Enter your name.";
        return;
    }

    if (!code) {
        errorEl.textContent = "Enter the access code.";
        return;
    }

    if (code !== accessCodes[selectedTest]) {
        errorEl.textContent = "Wrong access code.";
        return;
    }

    if (typed !== required) {
        errorEl.textContent = "You must type the agreement exactly.";
        return;
    }

    localStorage.setItem("exam", JSON.stringify({
        type: "listening",
        test: selectedTest,
        candidateName: name
    }));

    window.location.href = testRoutes[selectedTest];
}
