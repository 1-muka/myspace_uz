const TEST_DURATION_SECONDS = 60 * 60;
const MAX_VIOLATIONS = 3;
const REVIEW_ATTEMPT_ID = new URLSearchParams(window.location.search).get("review");
const ANSWERS_KEY = "reading_test4_answers";
const STATE_KEY = "reading_test4_state";

const correctAnswers = {
    q1: "FALSE",
    q2: "NOT GIVEN",
    q3: "NOT GIVEN",
    q4: "FALSE",
    q5: "TRUE",
    q6: "FALSE",
    q7: "NOT GIVEN",
    q8: "cemetery",
    q9: "writing",
    q10: "settlement",
    q11: "nuts",
    q12: "wheat",
    q13: "pigs",
    q14: "vi",
    q15: "ix",
    q16: "iii",
    q17: "i",
    q18: "viii",
    q19: "iv",
    q20: "C",
    q21: "E",
    q22: "B",
    q23: "D",
    q24: "alternative medicine",
    q25: "india|ancient india",
    q26: "treat",
    q27: "combines",
    q28: "YES",
    q29: "NO",
    q30: "NO",
    q31: "YES",
    q32: "NOT GIVEN",
    q33: "B",
    q34: "I",
    q35: "G",
    q36: "C",
    q37: "D",
    q38: "A",
    q39: "A",
    q40: "D"
};

let timerInterval = null;

function defaultState() {
    return {
        started: false,
        finished: false,
        paused: true,
        currentPassage: 1,
        timeLeft: TEST_DURATION_SECONDS,
        violationCount: 0,
        numbersVisible: true
    };
}

function loadState() {
    try {
        return { ...defaultState(), ...(JSON.parse(sessionStorage.getItem(STATE_KEY)) || {}) };
    } catch {
        return defaultState();
    }
}

const state = loadState();

function saveState() {
    sessionStorage.setItem(STATE_KEY, JSON.stringify(state));
}

function byId(id) {
    return document.getElementById(id);
}

function normalize(value) {
    return String(value || "").trim().toLowerCase().replace(/\s+/g, " ");
}

function correctVariants(key) {
    const value = correctAnswers[key];
    if (typeof value === "string" && value.includes("|")) {
        return value.split("|").map((item) => normalize(item));
    }
    return [normalize(value)];
}

function answerMatches(key, value) {
    return correctVariants(key).includes(normalize(value));
}

function formatTime(seconds) {
    return `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
}

function loadAnswers() {
    try {
        return JSON.parse(localStorage.getItem(ANSWERS_KEY)) || {};
    } catch {
        return {};
    }
}

function saveAnswer(id, value) {
    const answers = loadAnswers();
    answers[id] = value;
    localStorage.setItem(ANSWERS_KEY, JSON.stringify(answers));
}

function restoreAnswers() {
    const answers = loadAnswers();
    for (let i = 1; i <= 40; i++) {
        const input = byId(`q${i}`);
        if (input && answers[`q${i}`] !== undefined) {
            input.value = answers[`q${i}`];
        }
    }
}

function collectAllAnswers() {
    const answers = {};
    for (let i = 1; i <= 40; i++) {
        const input = byId(`q${i}`);
        answers[`q${i}`] = input ? String(input.value || "") : "";
    }
    return answers;
}

async function loadReviewAttemptById(attemptId) {
    const attempt = await EmeraldTracker.getAttemptById(attemptId);
    return attempt && attempt.section === "reading" ? attempt : null;
}

function renderTimer() {
    const el = byId("timer");
    if (el) el.textContent = formatTime(state.timeLeft);
}

function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        if (!state.started || state.finished || state.paused) return;
        state.timeLeft = Math.max(0, state.timeLeft - 1);
        saveState();
        renderTimer();
        if (state.timeLeft === 0) finishReading("Time is up.");
    }, 1000);
}

function getPassageForQuestion(n) {
    if (n <= 13) return 1;
    if (n <= 27) return 2;
    return 3;
}

function showPassage(n) {
    state.currentPassage = n;
    saveState();

    document.querySelectorAll(".passage-screen").forEach((section) => {
        section.classList.toggle("active", Number(section.dataset.passage) === n);
    });

    const active = document.querySelector(`.passage-screen[data-passage="${n}"]`);
    if (active) {
        active.querySelector(".passage")?.scrollTo(0, 0);
        active.querySelector(".questions")?.scrollTo(0, 0);
    }

    updateNavButtons();
    updatePassageDots();
}

function updateNavButtons() {
    byId("prevBtn").disabled = state.currentPassage === 1;
    byId("nextBtn").style.display = state.currentPassage === 3 ? "none" : "inline-block";
    byId("finishBtn").style.display = state.currentPassage === 3 ? "inline-block" : "none";
}

function buildNumberGrid() {
    const grid = byId("numberGrid");
    if (!grid) return;
    grid.innerHTML = "";
    for (let i = 1; i <= 40; i++) {
        const dot = document.createElement("div");
        dot.className = "dot";
        dot.id = `dot-${i}`;
        dot.textContent = i;
        dot.addEventListener("click", () => showPassage(getPassageForQuestion(i)));
        grid.appendChild(dot);
    }
}

function markDot(n, filled) {
    byId(`dot-${n}`)?.classList.toggle("answered", Boolean(filled));
}

function updatePassageDots() {
    document.querySelectorAll(".dot").forEach((dot) => dot.classList.remove("current-passage"));
    for (let i = 1; i <= 40; i++) {
        if (getPassageForQuestion(i) === state.currentPassage) {
            byId(`dot-${i}`)?.classList.add("current-passage");
        }
    }
}

function syncAllDots() {
    for (let i = 1; i <= 40; i++) {
        const input = byId(`q${i}`);
        markDot(i, input && input.value.trim() !== "");
    }
}

function setupInputs() {
    document.querySelectorAll('input[id^="q"]').forEach((input) => {
        input.addEventListener("input", () => {
            saveAnswer(input.id, input.value);
            markDot(Number(input.id.replace("q", "")), input.value.trim() !== "");
        });
    });
}

function applyNumbersVisibility() {
    const footer = byId("numbersFooter");
    const toggleBtn = byId("toggleNumbersBtn");
    if (!footer || !toggleBtn) return;
    footer.classList.toggle("is-hidden", !state.numbersVisible);
    toggleBtn.textContent = state.numbersVisible ? "Hide Numbers" : "Show Numbers";
}

function showOverlay(title, message, buttonText, handler) {
    byId("rulesCard").style.display = "none";
    byId("lockdownCard").style.display = "";
    byId("overlayTitle").textContent = title;
    byId("overlayMessage").textContent = message;
    const btn = byId("lockdownActionBtn");
    btn.textContent = buttonText;
    btn.onclick = handler;
    byId("readingOverlay").style.display = "flex";
}

function hideOverlay() {
    byId("readingOverlay").style.display = "none";
    byId("rulesCard").style.display = "";
    byId("lockdownCard").style.display = "none";
}

async function requestFullscreen() {
    if (document.fullscreenElement || !document.documentElement.requestFullscreen) return true;
    try {
        await document.documentElement.requestFullscreen();
        return true;
    } catch (error) {
        console.warn("Fullscreen failed:", error);
        return false;
    }
}

async function startReading() {
    state.started = true;
    state.finished = false;
    state.paused = true;
    state.currentPassage = 1;
    saveState();
    showPassage(1);

    const ok = await requestFullscreen();
    if (!ok && !document.fullscreenElement) {
        showOverlay("Start Reading Test", "Fullscreen is required. Click the button to try again.", "Start Test", startReading);
        return;
    }

    state.paused = false;
    saveState();
    hideOverlay();
    startTimer();
}

async function resumeReading() {
    const ok = await requestFullscreen();
    if (!ok && !document.fullscreenElement) {
        showOverlay("Exam Paused", "Fullscreen was not granted. Click to try again.", "Return to Test", resumeReading);
        return;
    }
    state.paused = false;
    saveState();
    hideOverlay();
}

function setupFullscreenSecurity() {
    document.addEventListener("fullscreenchange", () => {
        if (!state.started || state.finished) return;

        if (!document.fullscreenElement) {
            state.violationCount++;
            if (state.violationCount >= MAX_VIOLATIONS) {
                saveState();
                finishReading(`Reading test ended after ${MAX_VIOLATIONS} fullscreen violations.`);
                return;
            }
            state.paused = true;
            saveState();
            showOverlay(
                "Exam Paused",
                `Stay in fullscreen. Warning ${state.violationCount}/${MAX_VIOLATIONS}.`,
                "Return to Test",
                resumeReading
            );
        } else if (!state.finished) {
            state.paused = false;
            saveState();
            hideOverlay();
        }
    });
}

function grade() {
    let score = 0;
    for (let i = 1; i <= 40; i++) {
        const input = byId(`q${i}`);
        if (!input) continue;
        const correct = answerMatches(`q${i}`, input.value);
        input.classList.remove("correct-input", "wrong-input");
        if (input.value.trim()) input.classList.add(correct ? "correct-input" : "wrong-input");
        if (correct) score++;
    }
    return score;
}

function getBand(score) {
    if (score >= 39) return 9.0;
    if (score >= 37) return 8.5;
    if (score >= 35) return 8.0;
    if (score >= 32) return 7.5;
    if (score >= 30) return 7.0;
    if (score >= 26) return 6.5;
    if (score >= 23) return 6.0;
    if (score >= 18) return 5.5;
    if (score >= 16) return 5.0;
    if (score >= 13) return 4.5;
    if (score >= 11) return 4.0;
    if (score >= 8) return 3.5;
    if (score >= 6) return 3.0;
    if (score >= 4) return 2.5;
    return 0.0;
}

function showResult(message, score, band) {
    byId("readingResultOverlay")?.remove();

    const overlay = document.createElement("div");
    overlay.id = "readingResultOverlay";
    overlay.style.cssText = `
        position:fixed; inset:0;
        background:rgba(0,0,0,0.82);
        display:flex; justify-content:center; align-items:center;
        z-index:100000; padding:20px;
    `;

    overlay.innerHTML = `
        <div style="
            width:min(92vw,380px);
            background:white; border-radius:24px;
            padding:34px 28px; text-align:center;
            box-shadow:0 24px 60px rgba(0,0,0,0.28);
        ">
            <div style="font-size:12px;font-weight:800;letter-spacing:0.08em;color:#6b7280;text-transform:uppercase;margin-bottom:10px;">
                Reading Test 4 Result
            </div>
            <div style="font-size:52px;font-weight:800;color:#0d8a5e;margin-bottom:10px;">
                Band ${band}
            </div>
            <div style="font-size:20px;color:#111827;margin-bottom:8px;">
                Score: <strong>${score}/40</strong>
            </div>
            <div style="font-size:14px;color:#6b7280;margin-bottom:24px;line-height:1.5;">
                ${message}
            </div>
            <button id="backToDashboardBtn" style="
                border:none; border-radius:12px; padding:14px 24px;
                background:linear-gradient(135deg,#0d8a5e,#1dbf73);
                color:white; font-size:15px; font-weight:700;
                cursor:pointer; box-shadow:0 10px 25px rgba(13,138,94,0.25);
            ">Back to Dashboard</button>
        </div>
    `;

    document.body.appendChild(overlay);
    byId("backToDashboardBtn").addEventListener("click", () => {
        window.location.href = "dashboard.html";
    });
}

function applyReviewAttempt(attempt) {
    const answers = attempt && attempt.answers ? attempt.answers : {};
    for (let i = 1; i <= 40; i++) {
        const input = byId(`q${i}`);
        if (!input) continue;
        input.value = String(answers[`q${i}`] || "");
        input.disabled = true;
        input.classList.remove("correct-input", "wrong-input");
        const correct = answerMatches(`q${i}`, input.value);
        if (input.value.trim()) input.classList.add(correct ? "correct-input" : "wrong-input");
        markDot(i, input.value.trim() !== "");
    }

    byId("readingOverlay").style.display = "none";
    byId("toggleNumbersBtn").disabled = false;
    byId("finishBtn").textContent = "Finish Review";
    byId("finishBtn").style.display = "inline-block";
    byId("finishBtn").onclick = () => {
        window.location.href = "dashboard.html";
    };
    byId("nextBtn").style.display = "inline-block";
    byId("prevBtn").disabled = state.currentPassage === 1;

    const navBar = document.querySelector(".reading-nav-bar");
    if (navBar) {
        const banner = document.createElement("div");
        banner.style.cssText = "padding:10px 14px;border-radius:10px;background:#e9faf3;color:#15543f;font-weight:700;font-size:13px;margin-right:auto;";
        banner.textContent = `Review mode: Band ${attempt.band ?? "?"} (${attempt.correctAnswers ?? 0}/40)`;
        navBar.prepend(banner);
    }
}

function finishReading(message = "Test finished.") {
    if (state.finished) return;

    state.finished = true;
    state.paused = true;
    saveState();

    clearInterval(timerInterval);

    const score = grade();
    const band = getBand(score);

    if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
    }

    EmeraldTracker.recordSectionResult({
        section: "reading",
        testId: "test4",
        correctAnswers: score,
        totalQuestions: 40,
        band: band,
        answers: collectAllAnswers()
    }).catch(console.error);

    showResult(message, score, band);
}

document.addEventListener("DOMContentLoaded", async () => {
    App.requireAuth();

    if (window.EmeraldFirebaseBridge) {
        await EmeraldFirebaseBridge.ready();
    }

    if (REVIEW_ATTEMPT_ID) {
        buildNumberGrid();
        showPassage(1);
        const attempt = await loadReviewAttemptById(REVIEW_ATTEMPT_ID);
        if (attempt) {
            applyReviewAttempt(attempt);
            updatePassageDots();
        } else {
            alert("Review attempt not found.");
            window.location.href = "dashboard.html";
        }
        byId("prevBtn").addEventListener("click", () => {
            if (state.currentPassage > 1) showPassage(state.currentPassage - 1);
        });
        byId("nextBtn").addEventListener("click", () => {
            if (state.currentPassage < 3) showPassage(state.currentPassage + 1);
        });
        byId("toggleNumbersBtn").addEventListener("click", () => {
            state.numbersVisible = !state.numbersVisible;
            applyNumbersVisibility();
        });
        applyNumbersVisibility();
        return;
    }

    if (state.finished) {
        Object.assign(state, defaultState());
        saveState();
    }

    buildNumberGrid();
    restoreAnswers();
    syncAllDots();
    showPassage(state.currentPassage || 1);
    renderTimer();
    setupInputs();
    setupFullscreenSecurity();
    startTimer();

    byId("prevBtn").addEventListener("click", () => {
        if (state.currentPassage > 1) showPassage(state.currentPassage - 1);
    });

    byId("nextBtn").addEventListener("click", () => {
        if (state.currentPassage < 3) showPassage(state.currentPassage + 1);
    });

    byId("finishBtn").addEventListener("click", () => finishReading("Test finished."));

    byId("toggleNumbersBtn").addEventListener("click", () => {
        state.numbersVisible = !state.numbersVisible;
        saveState();
        applyNumbersVisibility();
    });

    applyNumbersVisibility();
    byId("overlayActionBtn").addEventListener("click", startReading);

    if (state.started && !state.finished) {
        showOverlay(
            "Exam Paused",
            `Continue the test in fullscreen. You have ${MAX_VIOLATIONS - state.violationCount} chance(s) left.`,
            "Continue Test",
            resumeReading
        );
    } else {
        byId("readingOverlay").style.display = "flex";
        byId("rulesCard").style.display = "";
        byId("lockdownCard").style.display = "none";
    }
});
