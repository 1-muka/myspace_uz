// reading-entry.js

let selectedTest = null;

const accessCodes = {
    test1: "READ1",
    test2: "READ2",
    test3: "READ3",
    test4: "READ4",
    test5: "READ5",
    test6: "READ6"
};

const routes = {
    test1: "reading-test1.html",
    test2: "reading-test2.html",
    test3: "reading-test3.html",
    test4: "reading-test4.html",
    test5: "reading-test5.html",
    test6: "reading-test6.html"
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
    const name     = document.getElementById("nameInput").value.trim();
    const code     = document.getElementById("accessCodeInput").value.trim();
    const typed    = document.getElementById("agreementInput").value.trim();
    const required = document.getElementById("requiredPhrase").textContent.trim();
    const errorEl  = document.getElementById("modalError");

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
        type: "reading",
        test: selectedTest,
        candidateName: name
    }));

    window.location.href = routes[selectedTest];
}
