const STORAGE_KEY = "emerald_writing_mock_v1";
const EXAM_DURATION_SECONDS = 60 * 60;
const MAX_VIOLATIONS = 3;
const REVIEW_ATTEMPT_ID = new URLSearchParams(window.location.search).get("review");

const TASK_META = {
    task1: {
        label: "Task 1 Answer",
        minHint: "Minimum 150 words"
    },
    task2: {
        label: "Task 2 Answer",
        minHint: "Minimum 250 words"
    }
};

function getDefaultState() {
    return {
        started: false,
        finished: false,
        paused: true,
        violationCount: 0,
        currentTask: "task1",
        timeLeft: EXAM_DURATION_SECONDS,
        answers: {
            task1: "",
            task2: ""
        }
    };
}

function loadState() {
    try {
        const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY));
        return {
            ...getDefaultState(),
            ...saved,
            answers: {
                ...getDefaultState().answers,
                ...(saved && saved.answers ? saved.answers : {})
            }
        };
    } catch {
        return getDefaultState();
    }
}

const state = loadState();
let timerInterval = null;

function saveState() {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function byId(id) {
    return document.getElementById(id);
}

function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function countWords(text) {
    const clean = String(text || "").trim();
    return clean ? clean.split(/\s+/).length : 0;
}

function renderTimer() {
    byId("timer").textContent = formatTime(state.timeLeft);
}

function renderViolationCount() {
    const chip = byId("writingViolationChip");
    if (!chip) return;
    chip.textContent = `Violations: ${state.violationCount} / ${MAX_VIOLATIONS}`;
}

function renderDate() {
    const dateElement = byId("currentDateChip");
    const now = new Date();

    const formatted = now.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });

    dateElement.textContent = formatted;
}

function updateCounts() {
    const text = byId("writingAnswer").value;
    byId("wordCount").textContent = countWords(text);
    byId("charCount").textContent = text.length;
}

function saveCurrentAnswer() {
    state.answers[state.currentTask] = byId("writingAnswer").value;
    saveState();
}

async function loadReviewAttemptById(attemptId) {
    const attempt = await EmeraldTracker.getAttemptById(attemptId);
    return attempt && attempt.section === "writing" ? attempt : null;
}

function applyWritingReview(attempt) {
    const saved = attempt.answers || {};
    state.answers.task1 = saved.task1 || "";
    state.answers.task2 = saved.task2 || "";
    state.currentTask = "task1";
    switchTask("task1");
    byId("writingAnswer").disabled = true;
    document.querySelectorAll("[data-task-btn]").forEach(btn => {
        btn.disabled = false;
    });
    byId("aiCheckBtn").style.display = "none";
    byId("submitWritingBtn").innerHTML = "<span>Finish Review</span>";
    byId("submitWritingBtn").onclick = () => { window.location.href = "dashboard.html"; };
    const rulesOverlay = byId("writingRulesOverlay");
    if (rulesOverlay) rulesOverlay.style.display = "none";
    hideLockdown();
}

function switchTask(taskName) {
    saveCurrentAnswer();
    state.currentTask = taskName;
    saveState();

    document.querySelectorAll("[data-task-screen]").forEach((screen) => {
        screen.classList.toggle("active", screen.dataset.taskScreen === taskName);
    });

    document.querySelectorAll("[data-task-btn]").forEach((button) => {
        button.classList.toggle("active", button.dataset.taskBtn === taskName);
    });

    byId("currentTaskLabel").textContent = TASK_META[taskName].label;
    byId("minWordHint").textContent = TASK_META[taskName].minHint;
    byId("writingAnswer").value = state.answers[taskName] || "";

    updateCounts();
}

function startTimer() {
    clearInterval(timerInterval);

    timerInterval = setInterval(() => {
        if (!state.started || state.finished || state.paused) return;
        state.timeLeft = Math.max(0, state.timeLeft - 1);
        renderTimer();
        saveState();

        if (state.timeLeft === 0) {
            finishWriting("Time is up. Your writing mock has ended.");
        }
    }, 1000);
}

function showLockdown(message) {
    const overlay = byId("writingLockdownOverlay");
    const text = byId("writingLockdownMessage");
    if (text) text.textContent = message;
    overlay?.classList.remove("hidden");
}

function hideLockdown() {
    byId("writingLockdownOverlay")?.classList.add("hidden");
}

async function requestFullscreen() {
    if (document.fullscreenElement || !document.documentElement.requestFullscreen) return true;
    try {
        await document.documentElement.requestFullscreen();
        return true;
    } catch {
        return false;
    }
}

async function resumeWriting() {
    if (state.finished) return;
    const ok = await requestFullscreen();
    if (!ok && !document.fullscreenElement) {
        showLockdown("Fullscreen is required to continue this writing test.");
        return;
    }
    state.paused = false;
    saveState();
    hideLockdown();
}

function finishWriting(message) {
    if (state.finished) return;
    state.finished = true;
    state.paused = true;
    saveCurrentAnswer();
    saveState();
    clearInterval(timerInterval);

    if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
    }

    alert(message);
}

function showWritingResultModal(result) {
    byId("writingResultOverlay")?.remove();
    const overlay = document.createElement("div");
    overlay.id = "writingResultOverlay";
    overlay.style.cssText = "position:fixed;inset:0;background:rgba(0,0,0,0.82);display:flex;justify-content:center;align-items:center;z-index:100000;padding:20px;";
    overlay.innerHTML = `
        <div style="width:min(92vw,420px);background:#fff;border-radius:24px;padding:34px 28px;text-align:center;box-shadow:0 24px 60px rgba(0,0,0,0.28);">
            <div style="font-size:12px;font-weight:800;letter-spacing:0.08em;color:#6b7280;text-transform:uppercase;margin-bottom:10px;">
                Writing Mock Result
            </div>
            <div style="font-size:42px;font-weight:800;color:#0d8a5e;margin-bottom:14px;">
                Band ${result.overallBand}
            </div>
            <div style="display:flex;justify-content:center;gap:12px;margin-bottom:16px;">
                <span style="background:#eef7f3;color:#0d8a5e;border-radius:10px;padding:8px 12px;font-weight:700;">Task 1: ${result.task1Band}</span>
                <span style="background:#eef7f3;color:#0d8a5e;border-radius:10px;padding:8px 12px;font-weight:700;">Task 2: ${result.task2Band}</span>
            </div>
            <button id="writingResultBackBtn" style="border:none;border-radius:12px;padding:14px 24px;background:linear-gradient(135deg,#0d8a5e,#1dbf73);color:white;font-size:15px;font-weight:700;cursor:pointer;box-shadow:0 10px 25px rgba(13,138,94,0.25);">Return to Dashboard</button>
        </div>
    `;
    document.body.appendChild(overlay);
    byId("writingResultBackBtn").addEventListener("click", () => {
        window.location.href = "dashboard.html";
    });
}

async function submitWritingWithAIScore() {
    if (state.finished) return;
    saveCurrentAnswer();

    if (!window.EmeraldWritingAI) {
        alert("Writing AI scorer is not available.");
        return;
    }

    if (!EmeraldWritingAI.canUseToday()) {
        alert("You can check only one essay per day. Please try again tomorrow.");
        return;
    }

    const result = await EmeraldWritingAI.evaluateWritingAsync(state.answers.task1, state.answers.task2);
    EmeraldWritingAI.consumeToday();

    await EmeraldTracker.recordSectionResult({
        section: "writing",
        testId: "test1",
        band: result.overallBand,
        mode: "practice",
        answers: {
            task1: state.answers.task1 || "",
            task2: state.answers.task2 || ""
        },
        meta: {
            task1Band: result.task1Band,
            task2Band: result.task2Band,
            task1Words: result.task1Words,
            task2Words: result.task2Words
        }
    });

    state.finished = true;
    state.paused = true;
    saveState();
    clearInterval(timerInterval);

    if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
    }

    showWritingResultModal(result);
}

document.addEventListener("DOMContentLoaded", async () => {
    App.requireAuth();

    if (window.EmeraldFirebaseBridge) {
        await EmeraldFirebaseBridge.ready();
    }

    if (REVIEW_ATTEMPT_ID) {
        renderDate();
        switchTask(state.currentTask);
        const attempt = await loadReviewAttemptById(REVIEW_ATTEMPT_ID);
        if (!attempt) {
            alert("Writing review attempt not found.");
            window.location.href = "dashboard.html";
            return;
        }
        applyWritingReview(attempt);
        return;
    }

    renderDate();
    renderTimer();
    renderViolationCount();
    switchTask(state.currentTask);
    startTimer();

    // Rules overlay — start button
    const rulesOverlay  = document.getElementById("writingRulesOverlay");
    const rulesStartBtn = document.getElementById("writingRulesStartBtn");

    if (rulesStartBtn && rulesOverlay) {
        rulesStartBtn.addEventListener("click", async () => {
            const ok = await requestFullscreen();
            if (!ok && !document.fullscreenElement) {
                showLockdown("Fullscreen is required to start this writing test.");
                return;
            }
            state.started = true;
            state.paused = false;
            saveState();
            rulesOverlay.style.display = "none";
            hideLockdown();
        });
    } else {
        // No overlay present — start immediately
        state.started = true;
        state.paused = false;
    }

    byId("writingAnswer").addEventListener("input", () => {
        state.answers[state.currentTask] = byId("writingAnswer").value;
        saveState();
        updateCounts();
    });

    document.querySelectorAll("[data-task-btn]").forEach((button) => {
        button.addEventListener("click", () => {
            switchTask(button.dataset.taskBtn);
        });
    });

    byId("submitWritingBtn").addEventListener("click", submitWritingWithAIScore);

    byId("backToDashboardBtn").addEventListener("click", () => {
        saveCurrentAnswer();
        window.location.href = "dashboard.html";
    });

    byId("aiCheckBtn").addEventListener("click", submitWritingWithAIScore);

    byId("writingResumeBtn")?.addEventListener("click", resumeWriting);

    document.addEventListener("fullscreenchange", () => {
        if (!state.started || state.finished) return;

        if (!document.fullscreenElement) {
            state.violationCount += 1;
            state.paused = true;
            renderViolationCount();
            saveState();

            if (state.violationCount >= MAX_VIOLATIONS) {
                finishWriting(`Writing test ended after ${MAX_VIOLATIONS} fullscreen violations.`);
                return;
            }

            showLockdown(`Stay in fullscreen. Warning ${state.violationCount}/${MAX_VIOLATIONS}.`);
        } else {
            state.paused = false;
            saveState();
            hideLockdown();
        }
    });
});
