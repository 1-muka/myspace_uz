
const TEST_DURATION_SECONDS = 35 * 60;
const MAX_VIOLATIONS = 3;
const REVIEW_ATTEMPT_ID = new URLSearchParams(window.location.search).get("review");

const correctAnswers = {
    q1:  "4",
    q2:  "46 wombat",
    q3:  "thursday",
    q4:  "8:30|8.30",
    q5:  "red",
    q6:  "lunch",
    q7:  "glasses",
    q8:  "ball",
    q9:  "aunt",
    q10: "month",
    q11: "C",
    q12: "E",
    q13: "B",
    q14: "A",
    q15: "C",
    q16: "B",
    q17: "C",
    q18: "D",
    q19: "D",
    q20: "A",
    q21: "C",
    q22: "A",
    q23: "A",
    q24: "B",
    q25: "B",
    q26: "E",
    q27: "D",
    q28: "A",
    q29: "G",
    q30: "C",
    q31: "achievement|achievements",
    q32: "personality|character",
    q33: "situational",
    q34: "friend",
    q35: "aspirations|ambitions",
    q36: "style",
    q37: "development",
    q38: "vision",
    q39: "structures",
    q40: "innovation|innovations"
};

const TEXT_QUESTIONS  = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 16, 17, 18, 19, 20, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40];
const RADIO_QUESTIONS = [13, 14, 15, 21, 22, 23, 24, 25];
const CHECKBOX_GROUPS = [
    { name: "q11_12", questions: [11, 12] }
];

const state = {
    examStarted:    false,
    examFinished:   false,
    examPaused:     false,
    timeLeft:       TEST_DURATION_SECONDS,
    timerInterval:  null,
    violationCount: 0,
    candidateName:  "Candidate"
};

function byId(id) { return document.getElementById(id); }

function normalize(value) {
    return String(value || "").trim().toLowerCase().replace(/\s+/g, " ");
}

function correctVariants(key) {
    const v = correctAnswers[key];
    if (v === undefined || v === null) return [];
    if (typeof v === "string" && v.includes("|")) {
        return v.split("|").map(s => normalize(s.trim()));
    }
    return [normalize(String(v))];
}

function answerMatches(key, rawInput) {
    const u = normalize(rawInput);
    if (!u) return false;
    if (correctVariants(key).includes(u)) return true;
    if (key === "q2") {
        const compact = u.replace(/\s+/g, "");
        return correctVariants(key).some(v => v.replace(/\s+/g, "") === compact);
    }
    return false;
}

function collectAllAnswers() {
    const answers = {};
    for (let i = 1; i <= 40; i++) {
        const input = byId(`q${i}`);
        if (input) answers[`q${i}`] = input.value || "";
    }
    RADIO_QUESTIONS.forEach(n => {
        const selected = document.querySelector(`input[name="q${n}"]:checked`);
        answers[`q${n}`] = selected ? selected.value : "";
    });
    CHECKBOX_GROUPS.forEach(g => {
        answers[g.name] = Array.from(document.querySelectorAll(`input[name="${g.name}"]:checked`)).map(i => i.value);
    });
    return answers;
}

async function loadReviewAttemptById(attemptId) {
    const attempt = await EmeraldTracker.getAttemptById(attemptId);
    return attempt && attempt.section === "listening" ? attempt : null;
}

function applyListeningReview(attempt) {
    const answers = attempt.answers || {};
    TEXT_QUESTIONS.forEach(n => {
        const input = byId(`q${n}`);
        if (!input) return;
        input.value = String(answers[`q${n}`] || "");
        input.disabled = true;
        const ok = answerMatches(`q${n}`, input.value);
        if (input.value.trim()) input.classList.add(ok ? "correct-input" : "wrong-input");
        markDot(n, input.value.trim() !== "");
    });

    RADIO_QUESTIONS.forEach(n => {
        const wanted = String(answers[`q${n}`] || "").toUpperCase();
        document.querySelectorAll(`input[name="q${n}"]`).forEach(input => {
            input.checked = input.value.toUpperCase() === wanted;
            input.disabled = true;
        });
        const selected = document.querySelector(`input[name="q${n}"]:checked`);
        if (selected) {
            const ok = normalize(selected.value) === normalize(correctAnswers[`q${n}`]);
            const label = selected.closest("label");
            if (label) {
                label.style.borderColor = ok ? "#27ae60" : "#e74c3c";
                label.style.boxShadow = ok ? "0 0 0 2px rgba(39,174,96,0.15)" : "0 0 0 2px rgba(231,76,60,0.15)";
            }
            markDot(n, true);
        }
    });

    CHECKBOX_GROUPS.forEach(g => {
        const selectedValues = Array.isArray(answers[g.name]) ? answers[g.name] : [];
        document.querySelectorAll(`input[name="${g.name}"]`).forEach(input => {
            input.checked = selectedValues.includes(input.value);
            input.disabled = true;
        });
        markMultiDots(g.questions[0], g.questions[1], selectedValues.length);
    });

    byId("rulesIntroOverlay")?.style && (byId("rulesIntroOverlay").style.display = "none");
    byId("lockdownOverlay")?.classList.add("hidden");
    byId("startTestBtn")?.classList.add("hidden");
    const finishBtn = document.querySelector("#part-4 .nav-btn.finish");
    if (finishBtn) {
        finishBtn.textContent = "Finish Review";
        finishBtn.onclick = () => { window.location.href = "dashboard.html"; };
    }
}

function renderTimer() {
    const timer = byId("timer");
    if (!timer) return;
    const m = Math.floor(state.timeLeft / 60);
    const s = state.timeLeft % 60;
    timer.textContent = `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function startTimer() {
    clearInterval(state.timerInterval);
    renderTimer();

    state.timerInterval = setInterval(() => {
        if (!state.examStarted || state.examFinished || state.examPaused) return;
        state.timeLeft = Math.max(0, state.timeLeft - 1);
        renderTimer();
        if (state.timeLeft === 0) finishTest("Time is up.");
    }, 1000);
}

window.goToPart = function (part) {
    const target = byId(`part-${part}`);
    if (!target) return;
    document.querySelectorAll(".part-container").forEach(s => s.classList.remove("active"));
    target.classList.add("active");
    const scrollBox = byId("mainScroll");
    if (scrollBox) scrollBox.scrollTop = 0;
};

function getPart(n) {
    if (n <= 10) return 1;
    if (n <= 20) return 2;
    if (n <= 30) return 3;
    return 4;
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
        dot.onclick = () => goToPart(getPart(i));
        grid.appendChild(dot);
    }
}

function markDot(n, filled) {
    const dot = byId(`dot-${n}`);
    if (dot) dot.classList.toggle("answered", Boolean(filled));
}

function markMultiDots(start, end, count) {
    markDot(start, count >= 1);
    markDot(end,   count >= 2);
}

function assignRadioValues() {
    const groups = new Map();
    document.querySelectorAll('input[type="radio"][name^="q"]').forEach(input => {
        if (!groups.has(input.name)) groups.set(input.name, []);
        groups.get(input.name).push(input);
    });

    groups.forEach(inputs => {
        inputs.forEach((input) => {
            const label = input.closest("label");
            const text  = label ? label.textContent.trim() : "";
            const match = text.match(/^([A-E])\./);
            if (match) input.value = match[1];
        });
    });
}

function setupInputs() {
    assignRadioValues();

    document.querySelectorAll('input[id^="q"]').forEach(input => {
        input.addEventListener("input", () => {
            const match = input.id.match(/^q(\d+)$/);
            if (match) markDot(Number(match[1]), input.value.trim() !== "");
        });
    });

    document.querySelectorAll('input[type="radio"][name^="q"]').forEach(input => {
        input.addEventListener("change", () => {
            const match = input.name.match(/^q(\d+)$/);
            if (match) markDot(Number(match[1]), true);
        });
    });

    CHECKBOX_GROUPS.forEach(group => {
        document.querySelectorAll(`input[name="${group.name}"]`).forEach(box => {
            box.addEventListener("change", () => {
                window.handleMultiSelect(group.name, group.questions[0], group.questions[1]);
            });
        });
    });
}

window.handleMultiSelect = function (groupName, start, end) {
    const boxes   = Array.from(document.querySelectorAll(`input[name="${groupName}"]`));
    const checked = boxes.filter(b => b.checked);
    if (checked.length > 2) checked[checked.length - 1].checked = false;
    const now = boxes.filter(b => b.checked);
    markMultiDots(start, end, now.length);
};

async function requestFullscreen() {
    if (document.fullscreenElement || !document.documentElement.requestFullscreen) return;
    try { await document.documentElement.requestFullscreen(); }
    catch (e) { console.warn("Fullscreen failed:", e); }
}

async function playAudio() {
    const audio = byId("examAudio");
    if (!audio) return;
    audio.classList.remove("hidden");
    try { await audio.play(); }
    catch (e) { console.warn("Audio autoplay blocked:", e); }
}

function pauseAudio() {
    const audio = byId("examAudio");
    if (audio) audio.pause();
}

async function startExam(candidateName) {
    if (state.examStarted || state.examFinished) return;

    state.examStarted   = true;
    state.examPaused    = false;
    state.candidateName = candidateName || "Candidate";

    const rulesOverlay = byId("rulesIntroOverlay");
    if (rulesOverlay) rulesOverlay.style.display = "none";

    byId("lockdownOverlay")?.classList.add("hidden");
    byId("startTestBtn")?.classList.add("hidden");

    await requestFullscreen();
    await playAudio();
    startTimer();
}

function setupStart() {
    byId("finalStartBtn")?.addEventListener("click", () => {
        const overlay = byId("rulesIntroOverlay");
        if (overlay) overlay.style.display = "none";
        const session = JSON.parse(localStorage.getItem("exam") || "{}");
        startExam(session.candidateName || "Candidate");
    });

    byId("startTestBtn")?.addEventListener("click", () => startExam("Candidate"));
}

function pauseForViolation(message) {
    if (state.examFinished) return;
    state.examPaused = true;
    pauseAudio();

    const overlay = byId("lockdownOverlay");
    const msg     = byId("lockdownMessage");
    if (msg)     msg.textContent = message;
    if (overlay) overlay.classList.remove("hidden");
}

function hideLockdown() {
    byId("lockdownOverlay")?.classList.add("hidden");
}

async function resumeExam() {
    if (state.examFinished) return;
    await requestFullscreen();
    state.examPaused = false;
    hideLockdown();
    await playAudio();
}

function setupSecurity() {
    byId("resumeExamBtn")?.addEventListener("click", resumeExam);

    document.addEventListener("fullscreenchange", () => {
        if (!state.examStarted || state.examFinished) return;

        if (!document.fullscreenElement) {
            state.violationCount++;
            if (state.violationCount >= MAX_VIOLATIONS) {
                finishTest(`Exam ended after ${MAX_VIOLATIONS} fullscreen violations.`);
                return;
            }
            pauseForViolation(`Stay in fullscreen. Warning ${state.violationCount}/${MAX_VIOLATIONS}.`);
        } else if (state.examPaused) {
            state.examPaused = false;
            hideLockdown();
            playAudio();
        }
    });
}

function gradeText(n) {
    const input = byId(`q${n}`);
    if (!input) return 0;
    const correct = answerMatches(`q${n}`, input.value);
    input.classList.toggle("correct-input", correct);
    input.classList.toggle("wrong-input", !correct);
    return correct ? 1 : 0;
}

function gradeRadio(n) {
    const selected = document.querySelector(`input[name="q${n}"]:checked`);
    if (!selected) return 0;
    const correct = normalize(selected.value) === normalize(correctAnswers[`q${n}`]);
    const label = selected.closest("label");
    if (label) {
        label.style.borderColor = correct ? "#27ae60" : "#e74c3c";
        label.style.boxShadow   = correct
            ? "0 0 0 2px rgba(39,174,96,0.15)"
            : "0 0 0 2px rgba(231,76,60,0.15)";
    }
    return correct ? 1 : 0;
}

function gradeCheckbox(groupName, q1, q2) {
    const checked = Array.from(document.querySelectorAll(`input[name="${groupName}"]:checked`))
        .map(i => normalize(i.value));
    let score = 0;
    if (checked.includes(normalize(correctAnswers[`q${q1}`]))) score++;
    if (checked.includes(normalize(correctAnswers[`q${q2}`]))) score++;
    return score;
}

function grade() {
    let score = 0;
    TEXT_QUESTIONS.forEach(n  => { score += gradeText(n);  });
    RADIO_QUESTIONS.forEach(n => { score += gradeRadio(n); });
    CHECKBOX_GROUPS.forEach(g => { score += gradeCheckbox(g.name, g.questions[0], g.questions[1]); });
    return score;
}

function convertToBand(score) {
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
    if (score >= 8)  return 3.5;
    if (score >= 6)  return 3.0;
    if (score >= 4)  return 2.5;
    return 0;
}

function showResultModal(message, score, band) {
    byId("listeningResultOverlay")?.remove();

    const overlay = document.createElement("div");
    overlay.id = "listeningResultOverlay";
    overlay.style.cssText = `
        position:fixed; inset:0;
        background:rgba(0,0,0,0.78);
        display:flex; justify-content:center; align-items:center;
        z-index:99999; padding:20px;
    `;

    overlay.innerHTML = `
        <div style="
            width:min(92vw,380px);
            background:white;
            border-radius:24px;
            padding:34px 28px;
            text-align:center;
            box-shadow:0 24px 60px rgba(0,0,0,0.28);
        ">
            <div style="font-size:12px;font-weight:800;letter-spacing:0.08em;color:#6b7280;text-transform:uppercase;margin-bottom:10px;">
                Listening Test 4 Result
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

function finishTest(message = "Test finished.") {
    if (state.examFinished) return;

    state.examFinished = true;
    state.examPaused   = false;

    clearInterval(state.timerInterval);
    pauseAudio();
    hideLockdown();

    const score = grade();
    const band  = convertToBand(score);

    if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
    }

    EmeraldTracker.recordSectionResult({
        section:        "listening",
        testId:         "test4",
        correctAnswers: score,
        totalQuestions: 40,
        band:           band,
        answers:        collectAllAnswers()
    }).catch(console.error);

    showResultModal(message, score, band);
}

window.finishTest = finishTest;

document.addEventListener("DOMContentLoaded", async () => {
    App.requireAuth();

    if (window.EmeraldFirebaseBridge) {
        await EmeraldFirebaseBridge.ready();
    }

    if (REVIEW_ATTEMPT_ID) {
        buildNumberGrid();
        setupInputs();
        renderTimer();
        const attempt = await loadReviewAttemptById(REVIEW_ATTEMPT_ID);
        if (!attempt) {
            alert("Listening review attempt not found.");
            window.location.href = "dashboard.html";
            return;
        }
        applyListeningReview(attempt);
        return;
    }

    buildNumberGrid();
    setupInputs();
    setupStart();
    setupSecurity();
    renderTimer();
});
