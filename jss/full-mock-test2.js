const FULL_MOCK_TWO_CONFIG = {
    accessCode: "MOCK222",
    agreementText: "I agree to take the test honestly and will not cheat or share materials.",
    testId: "full-mock-test2",
    maxViolations: 3,
    audioSrc: "../audio/full-mock-test2-listening.mp3",
    audioType: "audio/mpeg",
    paths: {
        authPage: "../index.html",
        dashboardPage: "dashboard.html"
    },
    sections: [
        { id: "listening", label: "Listening", durationSeconds: 35 * 60 },
        { id: "reading", label: "Reading", durationSeconds: 60 * 60 },
        { id: "writing", label: "Writing", durationSeconds: 60 * 60 }
    ]
};

const FULL_MOCK_TWO_STATE_KEY = "fullMockTest2State";
const DASHBOARD_FULL_MOCK_KEY = "dashboardFullMockLaunch";
const REVIEW_ATTEMPT_ID = new URLSearchParams(window.location.search).get("review");

const LISTENING_TEXT_QUESTIONS = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    15, 16, 17,
    25, 26, 27, 28, 29, 30,
    31, 32, 33, 34, 35, 36, 37, 38, 39, 40
];

const LISTENING_RADIO_QUESTIONS = [11, 12, 13, 14, 21, 22, 23, 24];
const LISTENING_CHECKBOX_GROUPS = [
    { name: "lq18_20", questions: [18, 19, 20], limit: 3 }
];
const READING_TOTAL_QUESTIONS = 40;
const READING_ANSWER_KEY = {
    q1: "TRUE",
    q2: "FALSE",
    q3: "NOT GIVEN",
    q4: "FALSE",
    q5: "NOT GIVEN",
    q6: "TRUE",
    q7: "1856",
    q8: "copper",
    q9: "weight",
    q10: "twice",
    q11: "weeks",
    q12: "insulation",
    q13: "funds",
    q14: "iv",
    q15: "v",
    q16: "ii",
    q17: "x",
    q18: "vii",
    q19: "i",
    q20: "viii",
    q21: "A",
    q22: "C",
    q23: "parental",
    q24: "directions",
    q25: "predators",
    q26: "visible",
    q27: "v",
    q28: "iii",
    q29: "ix",
    q30: "iv",
    q31: "vii",
    q32: "ii",
    q33: "identical",
    q34: "algorithms",
    q35: "statistics",
    q36: "speech",
    q37: "B",
    q38: "B",
    q39: "A",
    q40: "A"
};
const WRITING_TASKS = [
    {
        label: "Task 1",
        heading: "Academic Writing Task 1",
        subheading: "Report the main features of the visual information.",
        minWords: 150,
        promptHtml: `
            <div class="instruction-box">
                <p>
                    <strong>Task prompt:</strong>
                    The charts below show the proportion of people's total spending on different commodities and services in a particular European country in 1998 and 2008.
                </p>

                <p>
                    <strong>Instructions:</strong>
                    Summarise the information by selecting and reporting the main features, and make comparisons where relevant.
                </p>

                <p><strong>Write at least 150 words.</strong></p>
            </div>

            <div class="resource-alert">
                <strong>Task 1 image:</strong>
                <div class="task-visual-card">
        <img
            src="../images/mock2.jpg"
            alt="Task 1 visual"
            class="task-visual"
            onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
        >
        <div class="task-visual-placeholder">
           
        </div>
                <code>../images/mock2.jpg</code>.
            </div>
        `
    },
    {
        label: "Task 2",
        heading: "Academic Writing Task 2",
        subheading: "Present a clear opinion and support it with examples.",
        minWords: 250,
        promptHtml: `
            <div class="instruction-box">
                <p class="essay-statement">
                    Environmental protection should be the responsibility of politicians, not individuals as individuals can do too little.
                </p>

                <p class="essay-question">
                    To what extent do you agree or disagree?
                </p>

                <p>
                    <strong>Instructions:</strong>
                    Give reasons for your answer and include any relevant examples from your own knowledge and experience.
                </p>

                <p><strong>Write at least 250 words.</strong></p>
            </div>

            <div class="task-note-box">
                <h4>Quick Structure</h4>
                <p>Introduction</p>
                <p>Body Paragraph 1</p>
                <p>Body Paragraph 2</p>
                <p>Conclusion</p>
            </div>
        `
    }
];

const LISTENING_ANSWER_KEY = {
    lq1: "theatre|theater",
    lq2: "4.30|4:30|430",
    lq3: "station",
    lq4: "cooking",
    lq5: "plate",
    lq6: "river",
    lq7: "11.15|11:15|1115",
    lq8: "parking",
    lq9: "events",
    lq10: "feedback",
    lq11: "C",
    lq12: "B",
    lq13: "A",
    lq14: "B",
    lq15: "socks",
    lq16: "total block",
    lq17: "plastic",
    lq18: "A",
    lq19: "C",
    lq20: "F",
    lq21: "A",
    lq22: "B",
    lq23: "B",
    lq24: "A",
    lq25: "B",
    lq26: "C",
    lq27: "C",
    lq28: "A",
    lq29: "C",
    lq30: "B",
    lq31: "extinct",
    lq32: "education",
    lq33: "broken",
    lq34: "plantation",
    lq35: "city",
    lq36: "developed",
    lq37: "meanings",
    lq38: "french",
    lq39: "culture",
    lq40: "preposition"
};

const elements = {};
const readingTemplates = [];
let state = defaultState();
let timerId = null;
let reviewModeActive = false;

function defaultState() {
    return {
        started: false,
        finished: false,
        paused: true,
        violationCount: 0,
        lastViolationAt: 0,
        candidateName: "Candidate",
        sectionIndex: 0,
        listeningPart: 1,
        readingPassage: 1,
        writingTaskIndex: 0,
        sectionTimeLeft: FULL_MOCK_TWO_CONFIG.sections.reduce((accumulator, section) => {
            accumulator[section.id] = section.durationSeconds;
            return accumulator;
        }, {}),
        answers: {
            listening: {},
            reading: {},
            writing: {
                task1: "",
                task2: ""
            }
        }
    };
}

function byId(id) {
    return document.getElementById(id);
}

function currentSection() {
    return FULL_MOCK_TWO_CONFIG.sections[state.sectionIndex] || FULL_MOCK_TWO_CONFIG.sections[0];
}

function currentSectionId() {
    return currentSection().id;
}

function normalizeText(value) {
    return String(value || "")
        .trim()
        .toLowerCase()
        .replace(/[.,;:!?()[\]{}"'`]/g, " ")
        .replace(/\s+/g, " ");
}

function normalizeChoice(value) {
    return String(value || "").trim().toUpperCase();
}

function correctVariants(key) {
    const raw = LISTENING_ANSWER_KEY[key];
    if (!raw) return [];
    return String(raw).split("|").map((item) => normalizeText(item));
}

function answerMatches(key, rawInput) {
    const normalized = normalizeText(rawInput);
    return normalized ? correctVariants(key).includes(normalized) : false;
}

function checkboxAnswerMatches(questionNumber, selectedValues) {
    return selectedValues.includes(normalizeChoice(LISTENING_ANSWER_KEY[`lq${questionNumber}`]));
}

function saveState() {
    localStorage.setItem(FULL_MOCK_TWO_STATE_KEY, JSON.stringify(state));
}

function loadState() {
    try {
        const parsed = JSON.parse(localStorage.getItem(FULL_MOCK_TWO_STATE_KEY) || "null");
        if (!parsed) return defaultState();
        return {
            ...defaultState(),
            ...parsed,
            sectionTimeLeft: {
                ...defaultState().sectionTimeLeft,
                ...(parsed.sectionTimeLeft || {})
            },
            answers: {
                listening: {
                    ...(parsed.answers && parsed.answers.listening ? parsed.answers.listening : {})
                },
                reading: {
                    ...(parsed.answers && parsed.answers.reading ? parsed.answers.reading : {})
                },
                writing: {
                    ...defaultState().answers.writing,
                    ...(parsed.answers && parsed.answers.writing ? parsed.answers.writing : {})
                }
            }
        };
    } catch {
        return defaultState();
    }
}

function resetState() {
    state = defaultState();
    localStorage.removeItem(FULL_MOCK_TWO_STATE_KEY);
}

function renderCandidate() {
    elements.candidateDisplay.textContent = state.candidateName || "Candidate";
}

function renderTimer() {
    const timeLeft = state.sectionTimeLeft[currentSectionId()] ?? FULL_MOCK_TWO_CONFIG.sections[0].durationSeconds;
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    elements.timerDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function renderSectionTitle() {
    elements.sectionTitleDisplay.textContent = currentSection().label;
}

function renderViolationCounter() {
    elements.violationDisplay.textContent = `${state.violationCount} / ${FULL_MOCK_TWO_CONFIG.maxViolations}`;
}

function renderSectionProgress() {
    elements.sectionProgress.innerHTML = FULL_MOCK_TWO_CONFIG.sections.map((section, index) => {
        let className = "section-pill";
        if (index < state.sectionIndex) className += " completed";
        else if (index === state.sectionIndex) className += " active";
        else className += " locked";
        return `<div class="${className}">${section.label}</div>`;
    }).join("");
}

function openLobbyView() {
    elements.mockLobby.classList.remove("hidden");
    elements.mockExam.classList.add("hidden");
}

function openExamView() {
    elements.mockLobby.classList.add("hidden");
    elements.mockExam.classList.remove("hidden");
    renderSectionProgress();
    renderSectionTitle();
    renderCandidate();
    renderTimer();
    renderViolationCounter();
    renderActiveStage();
}

function showOverlay(overlay) {
    overlay.classList.remove("hidden");
}

function hideOverlay(overlay) {
    overlay.classList.add("hidden");
}

function openAccessModal() {
    elements.candidateNameInput.value = state.candidateName || App.getUser()?.name || "Candidate";
    elements.accessCodeInput.value = "";
    elements.agreementTypingInput.value = "";
    elements.policyAgreeCheckbox.checked = false;
    elements.accessErrorText.textContent = "";
    showOverlay(elements.mockAccessModal);
}

function closeAccessModal() {
    hideOverlay(elements.mockAccessModal);
}

function setAudioReadyState() {
    elements.mockAudioSource.src = FULL_MOCK_TWO_CONFIG.audioSrc;
    elements.mockAudioSource.type = FULL_MOCK_TWO_CONFIG.audioType;
    elements.mockAudio.load();
    elements.audioStatusText.textContent = "Listening audio is connected. Press play when the section starts.";
}

async function requestExamFullscreen() {
    if (document.fullscreenElement || !document.documentElement.requestFullscreen) return;
    try {
        await document.documentElement.requestFullscreen();
    } catch {
    }
}

function pauseListeningAudio() {
    elements.mockAudio.pause();
}

function tryPlayListeningAudio() {
    if (currentSectionId() !== "listening") return;
    elements.mockAudio.play().catch(() => {});
}

function startTimer() {
    stopTimer();
    renderTimer();
    timerId = setInterval(() => {
        if (!state.started || state.finished || state.paused) return;
        const sectionId = currentSectionId();
        state.sectionTimeLeft[sectionId] = Math.max(0, (state.sectionTimeLeft[sectionId] || 0) - 1);
        saveState();
        renderTimer();
        if (state.sectionTimeLeft[sectionId] === 0) {
            if (sectionId === "listening") finishListening(true);
            if (sectionId === "reading") finishReading(true);
            if (sectionId === "writing") finishWriting(true);
        }
    }, 1000);
}

function stopTimer() {
    if (!timerId) return;
    clearInterval(timerId);
    timerId = null;
}

function getListeningPartForQuestion(questionNumber) {
    if (questionNumber <= 10) return 1;
    if (questionNumber <= 20) return 2;
    if (questionNumber <= 30) return 3;
    return 4;
}

function buildListeningGrid() {
    elements.listeningNumberGrid.innerHTML = "";
    for (let question = 1; question <= 40; question += 1) {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "number-dot";
        button.dataset.question = String(question);
        button.textContent = String(question);
        button.addEventListener("click", () => showListeningPart(getListeningPartForQuestion(question)));
        elements.listeningNumberGrid.appendChild(button);
    }
}

function getCheckedValues(groupName) {
    return Array.from(document.querySelectorAll(`input[name="${groupName}"]:checked`)).map((node) => normalizeChoice(node.value));
}

function isListeningQuestionAnswered(questionNumber) {
    if (LISTENING_TEXT_QUESTIONS.includes(questionNumber)) {
        const input = byId(`lq${questionNumber}`);
        return Boolean(input && input.value.trim());
    }

    if (LISTENING_RADIO_QUESTIONS.includes(questionNumber)) {
        return Boolean(document.querySelector(`input[name="lq${questionNumber}"]:checked`));
    }

    if (questionNumber >= 18 && questionNumber <= 20) {
        return getCheckedValues("lq18_20").length >= questionNumber - 17;
    }

    return false;
}

function updateListeningGrid() {
    elements.listeningNumberGrid.querySelectorAll(".number-dot").forEach((dot) => {
        const questionNumber = Number(dot.dataset.question);
        dot.classList.toggle("answered", isListeningQuestionAnswered(questionNumber));
        dot.classList.toggle("current-scope", getListeningPartForQuestion(questionNumber) === state.listeningPart);
    });
}

function getReadingPassageForQuestion(questionNumber) {
    if (questionNumber <= 13) return 1;
    if (questionNumber <= 26) return 2;
    return 3;
}

function buildReadingGrid() {
    elements.readingNumberGrid.innerHTML = "";
    for (let question = 1; question <= READING_TOTAL_QUESTIONS; question += 1) {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "number-dot";
        button.dataset.question = String(question);
        button.textContent = String(question);
        button.addEventListener("click", () => showReadingPassage(getReadingPassageForQuestion(question)));
        elements.readingNumberGrid.appendChild(button);
    }
}

function isReadingQuestionAnswered(questionNumber) {
    return Boolean(String(state.answers.reading[`q${questionNumber}`] || "").trim());
}

function updateReadingGrid() {
    elements.readingNumberGrid.querySelectorAll(".number-dot").forEach((dot) => {
        const questionNumber = Number(dot.dataset.question);
        dot.classList.toggle("answered", isReadingQuestionAnswered(questionNumber));
        dot.classList.toggle("current-scope", getReadingPassageForQuestion(questionNumber) === state.readingPassage);
    });
}

function updateReadingNavButtons() {
    elements.readingPrevBtn.disabled = state.readingPassage === 1;
    elements.readingNextBtn.style.display = state.readingPassage === 3 ? "none" : "inline-flex";
    elements.finishReadingFooterBtn.style.display = state.readingPassage === 3 ? "inline-flex" : "none";
}

function cacheReadingTemplates() {
    readingTemplates.length = 0;

    elements.readingTemplateStore.querySelectorAll("[data-reading-passage]").forEach((screen) => {
        readingTemplates.push({
            passageHtml: screen.querySelector(".passage")?.innerHTML || "",
            questionsHtml: screen.querySelector(".questions")?.innerHTML || ""
        });
    });

    elements.readingTemplateStore.innerHTML = "";
}

function showReadingPassage(passageNumber, shouldScroll = true) {
    const safePassage = Math.min(Math.max(Number(passageNumber) || 1, 1), 3);
    state.readingPassage = safePassage;
    saveState();

    const template = readingTemplates[safePassage - 1];
    if (template) {
        elements.readingPassagePane.innerHTML = template.passageHtml;
        elements.readingQuestionsPane.innerHTML = template.questionsHtml;
        restoreReadingAnswers();
    }

    updateReadingNavButtons();
    updateReadingGrid();
    if (shouldScroll) {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
}

function persistReadingAnswer(input) {
    state.answers.reading[input.id] = input.value;
    saveState();
    updateReadingGrid();
}

function markReadingReviewInput(input) {
    const userRaw = state.answers.reading[input.id] || "";
    const answerKey = READING_ANSWER_KEY[input.id];
    const userValue = normalizeText(userRaw);
    const correctValues = String(answerKey || "").split("|").map((item) => normalizeText(item));
    const isCorrect = userValue !== "" && correctValues.includes(userValue);

    input.disabled = true;
    input.classList.toggle("mock-two-correct", isCorrect);
    input.classList.toggle("mock-two-wrong", !isCorrect && String(userRaw).trim() !== "");
}

function restoreReadingAnswers() {
    elements.readingQuestionsPane.querySelectorAll('[data-section="reading"]').forEach((input) => {
        input.value = state.answers.reading[input.id] || "";
        if (reviewModeActive) {
            markReadingReviewInput(input);
        }
    });
    updateReadingGrid();
}

function renderActiveStage() {
    const sectionId = currentSectionId();
    document.querySelectorAll(".exam-stage").forEach((stage) => {
        stage.classList.toggle("active", stage.dataset.stage === sectionId);
    });

    if (sectionId === "listening") {
        updateListeningGrid();
        showListeningPart(state.listeningPart || 1, false);
        return;
    }

    if (sectionId === "reading") {
        updateReadingGrid();
        showReadingPassage(state.readingPassage || 1, false);
        return;
    }

    if (sectionId === "writing") {
        renderWritingTask();
        renderWritingMetrics();
    }
}

function getCurrentWritingTaskKey() {
    return state.writingTaskIndex === 0 ? "task1" : "task2";
}

function countWords(text) {
    const cleaned = String(text || "").trim();
    return cleaned ? cleaned.split(/\s+/).length : 0;
}

function renderWritingTaskSwitcher() {
    elements.writingTaskSwitcher.innerHTML = WRITING_TASKS.map((task, index) => {
        return `<button class="task-btn${index === state.writingTaskIndex ? " active" : ""}" type="button" data-writing-task="${index}">${task.label}</button>`;
    }).join("");
}

function renderWritingTask() {
    const task = WRITING_TASKS[state.writingTaskIndex] || WRITING_TASKS[0];
    const taskKey = getCurrentWritingTaskKey();

    elements.writingTaskKicker.textContent = task.label;
    elements.writingTaskHeading.textContent = task.heading;
    elements.writingTaskSubheading.textContent = task.subheading;
    elements.writingPromptCard.innerHTML = task.promptHtml;
    elements.writingAnswerLabel.textContent = `${task.label} Answer`;
    elements.writingTargetHint.textContent = `Write at least ${task.minWords} words.`;
    elements.writingAnswerInput.value = state.answers.writing[taskKey] || "";
    renderWritingTaskSwitcher();
}

function renderWritingMetrics() {
    const taskOneWords = countWords(state.answers.writing.task1);
    const taskTwoWords = countWords(state.answers.writing.task2);
    const currentWords = countWords(elements.writingAnswerInput.value);

    elements.taskOneWordCount.textContent = String(taskOneWords);
    elements.taskTwoWordCount.textContent = String(taskTwoWords);
    elements.currentTaskWordCount.textContent = String(currentWords);
}

function switchWritingTask(taskIndex) {
    const safeIndex = Math.min(Math.max(Number(taskIndex) || 0, 0), WRITING_TASKS.length - 1);
    state.writingTaskIndex = safeIndex;
    saveState();
    renderWritingTask();
    renderWritingMetrics();
}

function showListeningPart(partNumber, shouldScroll = true) {
    const safePart = Math.min(Math.max(Number(partNumber) || 1, 1), 4);
    state.listeningPart = safePart;
    saveState();

    document.querySelectorAll(".mock-two-part").forEach((part) => {
        part.classList.toggle("active", Number(part.dataset.part) === safePart);
    });

    document.querySelectorAll("[data-listening-part]").forEach((button) => {
        button.classList.toggle("active", Number(button.dataset.listeningPart) === safePart);
    });

    updateListeningGrid();
    if (shouldScroll) {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
}

function persistTextAnswer(input) {
    state.answers.listening[input.id] = input.value;
    saveState();
    updateListeningGrid();
}

function persistRadioAnswer(groupName) {
    const selected = document.querySelector(`input[name="${groupName}"]:checked`);
    state.answers.listening[groupName] = selected ? selected.value : "";
    saveState();
    updateListeningGrid();
}

function persistCheckboxAnswer(groupName) {
    state.answers.listening[groupName] = getCheckedValues(groupName);
    saveState();
    updateListeningGrid();
}

function restoreListeningAnswers() {
    LISTENING_TEXT_QUESTIONS.forEach((questionNumber) => {
        const input = byId(`lq${questionNumber}`);
        if (input) input.value = state.answers.listening[input.id] || "";
    });

    LISTENING_RADIO_QUESTIONS.forEach((questionNumber) => {
        const value = state.answers.listening[`lq${questionNumber}`];
        if (!value) return;
        const input = document.querySelector(`input[name="lq${questionNumber}"][value="${value}"]`);
        if (input) input.checked = true;
    });

    LISTENING_CHECKBOX_GROUPS.forEach((group) => {
        const values = Array.isArray(state.answers.listening[group.name]) ? state.answers.listening[group.name] : [];
        document.querySelectorAll(`input[name="${group.name}"]`).forEach((input) => {
            input.checked = values.includes(normalizeChoice(input.value));
        });
    });

    updateListeningGrid();
}

function collectListeningAnswers() {
    const answers = {};

    LISTENING_TEXT_QUESTIONS.forEach((questionNumber) => {
        const input = byId(`lq${questionNumber}`);
        answers[`lq${questionNumber}`] = input ? input.value || "" : "";
    });

    LISTENING_RADIO_QUESTIONS.forEach((questionNumber) => {
        const selected = document.querySelector(`input[name="lq${questionNumber}"]:checked`);
        answers[`lq${questionNumber}`] = selected ? selected.value : "";
    });

    LISTENING_CHECKBOX_GROUPS.forEach((group) => {
        answers[group.name] = getCheckedValues(group.name);
    });

    return answers;
}

function collectReadingAnswers() {
    const answers = {};
    for (let question = 1; question <= READING_TOTAL_QUESTIONS; question += 1) {
        answers[`q${question}`] = state.answers.reading[`q${question}`] || "";
    }
    return answers;
}

function gradeReading(markInputs = false) {
    let score = 0;

    for (let question = 1; question <= READING_TOTAL_QUESTIONS; question += 1) {
        const answerKey = READING_ANSWER_KEY[`q${question}`];
        const userRaw = state.answers.reading[`q${question}`] || "";
        const userValue = normalizeText(userRaw);
        const correctValue = normalizeText(answerKey);
        const isCorrect = userValue !== "" && userValue === correctValue;

        if (markInputs) {
            const input = byId(`q${question}`);
            if (input) {
                input.classList.toggle("mock-two-correct", isCorrect);
                input.classList.toggle("mock-two-wrong", !isCorrect && String(userRaw).trim() !== "");
            }
        }

        if (isCorrect) score += 1;
    }

    return score;
}

function gradeText(questionNumber) {
    const input = byId(`lq${questionNumber}`);
    if (!input) return 0;
    const isCorrect = answerMatches(`lq${questionNumber}`, input.value);
    input.classList.toggle("mock-two-correct", isCorrect);
    input.classList.toggle("mock-two-wrong", !isCorrect && input.value.trim() !== "");
    return isCorrect ? 1 : 0;
}

function gradeRadio(questionNumber) {
    const selected = document.querySelector(`input[name="lq${questionNumber}"]:checked`);
    if (!selected) return 0;
    const isCorrect = normalizeChoice(selected.value) === normalizeChoice(LISTENING_ANSWER_KEY[`lq${questionNumber}`]);
    const label = selected.closest(".mock-two-option");
    if (label) {
        label.style.borderColor = isCorrect ? "#27ae60" : "#e74c3c";
        label.style.boxShadow = isCorrect
            ? "0 0 0 2px rgba(39,174,96,0.15)"
            : "0 0 0 2px rgba(231,76,60,0.15)";
    }
    return isCorrect ? 1 : 0;
}

function gradeCheckboxGroup() {
    const selectedValues = getCheckedValues("lq18_20");
    let score = 0;
    [18, 19, 20].forEach((questionNumber) => {
        if (checkboxAnswerMatches(questionNumber, selectedValues)) score += 1;
    });
    return score;
}

function gradeListening() {
    let score = 0;
    LISTENING_TEXT_QUESTIONS.forEach((questionNumber) => {
        score += gradeText(questionNumber);
    });
    LISTENING_RADIO_QUESTIONS.forEach((questionNumber) => {
        score += gradeRadio(questionNumber);
    });
    score += gradeCheckboxGroup();
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
    if (score >= 8) return 3.5;
    if (score >= 6) return 3.0;
    if (score >= 4) return 2.5;
    return 0;
}

function showSectionModal(title, message, buttonLabel, action) {
    elements.sectionModalTitle.textContent = title;
    elements.sectionModalMessage.innerHTML = message;
    elements.sectionModalActionBtn.textContent = buttonLabel;
    elements.sectionModalActionBtn.onclick = action;
    showOverlay(elements.sectionModal);
}

function moveToSection(sectionIndex) {
    state.sectionIndex = sectionIndex;
    state.paused = false;
    saveState();
    openExamView();
    window.scrollTo(0, 0);
}

function finishListening(fromTimer = false) {
    if (state.finished) return;

    pauseListeningAudio();
    hideOverlay(elements.lockdownOverlay);
    moveToSection(1);
}

function finishReading(fromTimer = false) {
    if (state.finished) return;

    hideOverlay(elements.lockdownOverlay);
    moveToSection(2);
}

async function finishWriting(fromTimer = false) {
    if (state.finished) return;

    state.finished = true;
    state.paused = true;
    saveState();
    stopTimer();
    hideOverlay(elements.lockdownOverlay);

    const listeningScore = gradeListening();
    const readingScore = gradeReading();
    const listeningBand = window.EmeraldTracker
        ? EmeraldTracker.convertListeningScoreToBand(listeningScore)
        : convertToBand(listeningScore);
    const readingBand = window.EmeraldTracker
        ? EmeraldTracker.convertReadingScoreToBand(readingScore)
        : convertToBand(readingScore);
    const task1Words = countWords(state.answers.writing.task1);
    const task2Words = countWords(state.answers.writing.task2);
    let writingResult = null;
    let writingBand = null;
    let overallBand = null;

    if (window.EmeraldWritingAI) {
        try {
            writingResult = await EmeraldWritingAI.evaluateWritingAsync(
                state.answers.writing.task1 || "",
                state.answers.writing.task2 || ""
            );
            writingBand = writingResult?.overallBand ?? null;
        } catch (error) {
            console.error("Failed to evaluate Full Mock Test 2 writing:", error);
        }
    }

    if (window.EmeraldTracker) {
        overallBand = EmeraldTracker.calculateOverallBand({
            listening: listeningBand,
            reading: readingBand,
            writing: writingBand,
            speaking: null
        });
    }

    const finalMessage = [
        fromTimer ? "The writing timer has ended." : "The full mock has been submitted.",
        `Listening: ${listeningScore}/40 (Band ${listeningBand})`,
        `Reading: ${readingScore}/40 (Band ${readingBand})`,
        `Total Correct Answers: ${listeningScore + readingScore}/80`,
        writingBand !== null
            ? `Writing: Task 1 Band ${writingResult.task1Band}, Task 2 Band ${writingResult.task2Band}, Overall Writing Band ${writingBand}`
            : `Writing: Task 1 ${task1Words} words, Task 2 ${task2Words} words`,
        overallBand !== null
            ? `Overall Mock Band: ${overallBand}`
            : `Overall Mock Band: unavailable until writing scoring is available`
    ].map((line) => `<div>${line}</div>`).join("");

    showSectionModal(
        "Full mock completed",
        finalMessage,
        "Return to Dashboard",
        () => {
            resetState();
            window.location.href = FULL_MOCK_TWO_CONFIG.paths.dashboardPage;
        }
    );

    if (!window.EmeraldTracker) return;

    Promise.allSettled([
        EmeraldTracker.recordSectionResult({
            section: "listening",
            testId: FULL_MOCK_TWO_CONFIG.testId,
            correctAnswers: listeningScore,
            totalQuestions: 40,
            band: listeningBand,
            mode: "full_mock",
            answers: collectListeningAnswers()
        }),
        EmeraldTracker.recordSectionResult({
            section: "reading",
            testId: FULL_MOCK_TWO_CONFIG.testId,
            correctAnswers: readingScore,
            totalQuestions: 40,
            band: readingBand,
            mode: "full_mock",
            answers: collectReadingAnswers()
        }),
        EmeraldTracker.recordSectionResult({
            section: "writing",
            testId: FULL_MOCK_TWO_CONFIG.testId,
            band: writingBand,
            mode: "full_mock",
            answers: {
                task1: state.answers.writing.task1 || "",
                task2: state.answers.writing.task2 || ""
            },
            meta: {
                task1Words,
                task2Words,
                task1Band: writingResult?.task1Band ?? null,
                task2Band: writingResult?.task2Band ?? null
            }
        }),
        EmeraldTracker.recordFullMockResult({
            testId: "test2",
            listeningBand,
            readingBand,
            writingBand,
            overallBand,
            answers: {
                listening: collectListeningAnswers(),
                reading: collectReadingAnswers(),
                writing: {
                    task1: state.answers.writing.task1 || "",
                    task2: state.answers.writing.task2 || ""
                }
            },
            meta: {
                listeningScore,
                readingScore,
                task1Words,
                task2Words,
                task1Band: writingResult?.task1Band ?? null,
                task2Band: writingResult?.task2Band ?? null
            }
        })
    ]).catch((error) => {
        console.error("Failed to save Full Mock Test 2 results:", error);
    });
}

function finishDueToViolation() {
    state.finished = true;
    state.paused = true;
    saveState();
    stopTimer();
    pauseListeningAudio();

    showSectionModal(
        "Full mock ended",
        "The exam was ended because the fullscreen or window rules were broken too many times.",
        "Return to Dashboard",
        () => {
            resetState();
            window.location.href = FULL_MOCK_TWO_CONFIG.paths.dashboardPage;
        }
    );
}

function registerViolation(message) {
    if (!state.started || state.finished || REVIEW_ATTEMPT_ID) return;

    const now = Date.now();
    if (now - state.lastViolationAt < 1200) return;

    state.lastViolationAt = now;
    state.violationCount += 1;
    state.paused = true;
    saveState();
    renderViolationCounter();
    stopTimer();
    pauseListeningAudio();

    if (state.violationCount >= FULL_MOCK_TWO_CONFIG.maxViolations) {
        finishDueToViolation();
        return;
    }

    elements.lockdownMessage.textContent = `${message} Warning ${state.violationCount}/${FULL_MOCK_TWO_CONFIG.maxViolations}.`;
    showOverlay(elements.lockdownOverlay);
}

async function resumeExamFromOverlay() {
    await requestExamFullscreen();
    if (!document.fullscreenElement) return;
    state.paused = false;
    saveState();
    hideOverlay(elements.lockdownOverlay);
    startTimer();
    tryPlayListeningAudio();
}

function bindListeningInputs() {
    LISTENING_TEXT_QUESTIONS.forEach((questionNumber) => {
        const input = byId(`lq${questionNumber}`);
        if (!input) return;
        input.addEventListener("input", () => persistTextAnswer(input));
    });

    LISTENING_RADIO_QUESTIONS.forEach((questionNumber) => {
        document.querySelectorAll(`input[name="lq${questionNumber}"]`).forEach((input) => {
            input.addEventListener("change", () => persistRadioAnswer(`lq${questionNumber}`));
        });
    });

    LISTENING_CHECKBOX_GROUPS.forEach((group) => {
        document.querySelectorAll(`input[name="${group.name}"]`).forEach((input) => {
            input.addEventListener("change", () => {
                const checked = document.querySelectorAll(`input[name="${group.name}"]:checked`);
                if (checked.length > group.limit) {
                    checked[checked.length - 1].checked = false;
                }
                persistCheckboxAnswer(group.name);
            });
        });
    });
}

function bindReadingInputs() {
    const handleReadingInput = (event) => {
        const input = event.target.closest('[data-section="reading"]');
        if (!input) return;
        persistReadingAnswer(input);
    };

    elements.readingQuestionsPane.addEventListener("input", handleReadingInput);
    elements.readingQuestionsPane.addEventListener("change", handleReadingInput);
}

function bindWritingInputs() {
    elements.writingAnswerInput.addEventListener("input", () => {
        const taskKey = getCurrentWritingTaskKey();
        state.answers.writing[taskKey] = elements.writingAnswerInput.value;
        saveState();
        renderWritingMetrics();
    });
}

function bindNavigation() {
    document.querySelectorAll("[data-listening-part]").forEach((button) => {
        button.addEventListener("click", () => showListeningPart(Number(button.dataset.listeningPart)));
    });

    document.querySelectorAll("[data-go-part]").forEach((button) => {
        button.addEventListener("click", () => showListeningPart(Number(button.dataset.goPart)));
    });

    elements.finishListeningBtn.addEventListener("click", () => finishListening(false));
    elements.finishListeningFooterBtn.addEventListener("click", () => finishListening(false));

    elements.readingPrevBtn.addEventListener("click", () => showReadingPassage((state.readingPassage || 1) - 1));
    elements.readingNextBtn.addEventListener("click", () => showReadingPassage((state.readingPassage || 1) + 1));
    elements.finishReadingBtn.addEventListener("click", () => finishReading(false));
    elements.finishReadingFooterBtn.addEventListener("click", () => finishReading(false));
    elements.submitWritingBtn.addEventListener("click", () => finishWriting(false));
    elements.writingTaskSwitcher.addEventListener("click", (event) => {
        const button = event.target.closest("[data-writing-task]");
        if (!button) return;
        switchWritingTask(Number(button.dataset.writingTask));
    });
}

function bindSecurity() {
    elements.resumeExamBtn.addEventListener("click", resumeExamFromOverlay);

    document.addEventListener("fullscreenchange", () => {
        if (!state.started || state.finished || REVIEW_ATTEMPT_ID) return;

        if (document.fullscreenElement) {
            if (state.paused && !elements.lockdownOverlay.classList.contains("hidden")) {
                state.paused = false;
                saveState();
                hideOverlay(elements.lockdownOverlay);
                startTimer();
                tryPlayListeningAudio();
            }
            return;
        }

        registerViolation("Fullscreen was closed.");
    });

    document.addEventListener("visibilitychange", () => {
        if (document.hidden) registerViolation("You left the exam window.");
    });

    window.addEventListener("blur", () => {
        if (document.visibilityState === "visible") registerViolation("The exam window lost focus.");
    });

    document.addEventListener("contextmenu", (event) => {
        if (state.started && !state.finished) event.preventDefault();
    });

    ["copy", "cut", "paste"].forEach((eventName) => {
        document.addEventListener(eventName, (event) => {
            if (state.started && !state.finished) event.preventDefault();
        });
    });

    document.addEventListener("keydown", (event) => {
        if (!state.started || state.finished) return;
        const key = event.key.toLowerCase();
        const blocked =
            event.key === "F12" ||
            event.key === "Escape" ||
            (event.ctrlKey && ["u", "p", "s", "a", "c", "v", "x"].includes(key)) ||
            (event.ctrlKey && event.shiftKey && ["i", "j", "c"].includes(key));
        if (blocked) event.preventDefault();
    });
}

function bindAccessFlow() {
    elements.openMockAccessBtn.addEventListener("click", openAccessModal);
    elements.closeMockAccessBtn.addEventListener("click", closeAccessModal);

    elements.confirmMockAccessBtn.addEventListener("click", () => {
        const name = elements.candidateNameInput.value.trim();
        const code = elements.accessCodeInput.value.trim();
        const agreed = elements.policyAgreeCheckbox.checked;
        const typedAgreement = elements.agreementTypingInput.value.trim();

        elements.accessErrorText.textContent = "";

        if (!name) {
            elements.accessErrorText.textContent = "Enter the candidate name.";
            return;
        }
        if (code !== FULL_MOCK_TWO_CONFIG.accessCode) {
            elements.accessErrorText.textContent = "Invalid access code.";
            return;
        }
        if (!agreed) {
            elements.accessErrorText.textContent = "You must agree to the test policy.";
            return;
        }
        if (typedAgreement !== FULL_MOCK_TWO_CONFIG.agreementText) {
            elements.accessErrorText.textContent = "Type the agreement sentence exactly.";
            return;
        }

        state = defaultState();
        state.started = true;
        state.paused = true;
        state.candidateName = name;
        saveState();
        closeAccessModal();
        openExamView();
        showOverlay(elements.examIntroOverlay);
    });

    elements.startExamFromIntroBtn.addEventListener("click", async () => {
        hideOverlay(elements.examIntroOverlay);
        await requestExamFullscreen();
        state.paused = false;
        saveState();
        openExamView();
        startTimer();
        tryPlayListeningAudio();
    });
}

function cacheElements() {
    [
        "mockLobby",
        "openMockAccessBtn",
        "mockAccessModal",
        "candidateNameInput",
        "accessCodeInput",
        "policyAgreeCheckbox",
        "agreementTypingInput",
        "confirmMockAccessBtn",
        "closeMockAccessBtn",
        "accessErrorText",
        "mockExam",
        "candidateDisplay",
        "sectionTitleDisplay",
        "timerDisplay",
        "violationDisplay",
        "sectionProgress",
        "mockAudio",
        "mockAudioSource",
        "audioStatusText",
        "listeningNumberGrid",
        "finishListeningBtn",
        "finishListeningFooterBtn",
        "readingTemplateStore",
        "readingPassagePane",
        "readingQuestionsPane",
        "readingNumberGrid",
        "readingPrevBtn",
        "readingNextBtn",
        "finishReadingBtn",
        "finishReadingFooterBtn",
        "writingTaskKicker",
        "writingTaskHeading",
        "writingTaskSubheading",
        "writingPromptCard",
        "writingAnswerLabel",
        "writingTargetHint",
        "writingAnswerInput",
        "taskOneWordCount",
        "taskTwoWordCount",
        "currentTaskWordCount",
        "writingTaskSwitcher",
        "submitWritingBtn",
        "examIntroOverlay",
        "startExamFromIntroBtn",
        "lockdownOverlay",
        "lockdownMessage",
        "resumeExamBtn",
        "sectionModal",
        "sectionModalTitle",
        "sectionModalMessage",
        "sectionModalActionBtn"
    ].forEach((id) => {
        elements[id] = byId(id);
    });
}

async function loadReviewAttemptById(attemptId) {
    const attempt = await EmeraldTracker.getAttemptById(attemptId);
    if (!attempt) return null;
    if (attempt.kind === "fullMock") return attempt;
    return ["listening", "reading", "writing"].includes(attempt.section) ? attempt : null;
}

function getReviewAnswerSet(attempt) {
    const saved = attempt.answers || {};
    const empty = defaultState().answers;

    if (attempt.kind === "fullMock") {
        return {
            listening: { ...(saved.listening || {}) },
            reading: { ...(saved.reading || {}) },
            writing: {
                ...empty.writing,
                ...(saved.writing || {})
            }
        };
    }

    return {
        listening: attempt.section === "listening" ? { ...saved } : {},
        reading: attempt.section === "reading" ? { ...saved } : {},
        writing: {
            ...empty.writing,
            ...(attempt.section === "writing" ? saved : {})
        }
    };
}

function applyListeningReviewAnswers(answers) {
    LISTENING_TEXT_QUESTIONS.forEach((questionNumber) => {
        const input = byId(`lq${questionNumber}`);
        if (!input) return;
        input.value = String(answers[`lq${questionNumber}`] || "");
        input.disabled = true;
        const isCorrect = answerMatches(`lq${questionNumber}`, input.value);
        if (input.value.trim()) {
            input.classList.add(isCorrect ? "mock-two-correct" : "mock-two-wrong");
        }
    });

    LISTENING_RADIO_QUESTIONS.forEach((questionNumber) => {
        const wanted = normalizeChoice(answers[`lq${questionNumber}`] || "");
        document.querySelectorAll(`input[name="lq${questionNumber}"]`).forEach((input) => {
            input.checked = normalizeChoice(input.value) === wanted;
            input.disabled = true;
        });
        const selected = document.querySelector(`input[name="lq${questionNumber}"]:checked`);
        if (selected) {
            const isCorrect = normalizeChoice(selected.value) === normalizeChoice(LISTENING_ANSWER_KEY[`lq${questionNumber}`]);
            const label = selected.closest(".mock-two-option");
            if (label) {
                label.style.borderColor = isCorrect ? "#27ae60" : "#e74c3c";
                label.style.boxShadow = isCorrect
                    ? "0 0 0 2px rgba(39,174,96,0.15)"
                    : "0 0 0 2px rgba(231,76,60,0.15)";
            }
        }
    });

    LISTENING_CHECKBOX_GROUPS.forEach((group) => {
        const selectedValues = Array.isArray(answers[group.name]) ? answers[group.name].map(normalizeChoice) : [];
        document.querySelectorAll(`input[name="${group.name}"]`).forEach((input) => {
            input.checked = selectedValues.includes(normalizeChoice(input.value));
            input.disabled = true;
            const label = input.closest(".mock-two-option");
            if (input.checked && label) {
                label.style.borderColor = "#0d8a5e";
                label.style.boxShadow = "0 0 0 2px rgba(13,138,94,0.15)";
            }
        });
    });

    updateListeningGrid();
}

function showReviewSection(sectionIndex) {
    state.sectionIndex = sectionIndex;
    state.paused = true;
    saveState();
    openExamView();
    window.scrollTo(0, 0);
}

function finishReview() {
    window.location.href = FULL_MOCK_TWO_CONFIG.paths.dashboardPage;
}

function configureReviewNavigation(attempt) {
    const isFullMockReview = attempt.kind === "fullMock";
    const listeningAction = isFullMockReview ? () => showReviewSection(1) : finishReview;
    const readingAction = isFullMockReview ? () => showReviewSection(2) : finishReview;

    elements.finishListeningBtn.textContent = isFullMockReview ? "Review Reading" : "Finish Review";
    elements.finishListeningFooterBtn.textContent = isFullMockReview ? "Review Reading" : "Finish Review";
    elements.finishReadingBtn.textContent = isFullMockReview ? "Review Writing" : "Finish Review";
    elements.finishReadingFooterBtn.textContent = isFullMockReview ? "Review Writing" : "Finish Review";
    elements.submitWritingBtn.textContent = "Finish Review";

    elements.finishListeningBtn.onclick = listeningAction;
    elements.finishListeningFooterBtn.onclick = listeningAction;
    elements.finishReadingBtn.onclick = readingAction;
    elements.finishReadingFooterBtn.onclick = readingAction;
    elements.submitWritingBtn.onclick = finishReview;
}

function applyReviewMode(attempt) {
    reviewModeActive = true;
    const answers = getReviewAnswerSet(attempt);
    const sectionIndexByName = { listening: 0, reading: 1, writing: 2 };

    state = defaultState();
    state.started = true;
    state.finished = true;
    state.paused = true;
    state.candidateName = attempt.userName || "Candidate";
    state.sectionIndex = attempt.kind === "fullMock" ? 0 : (sectionIndexByName[attempt.section] ?? 0);
    state.answers.listening = { ...answers.listening };
    state.answers.reading = { ...answers.reading };
    state.answers.writing = {
        ...defaultState().answers.writing,
        ...answers.writing
    };
    saveState();

    openExamView();
    hideOverlay(elements.examIntroOverlay);
    hideOverlay(elements.lockdownOverlay);
    hideOverlay(elements.mockAccessModal);
    pauseListeningAudio();

    applyListeningReviewAnswers(state.answers.listening);
    restoreReadingAnswers();
    renderWritingTask();
    renderWritingMetrics();
    elements.writingAnswerInput.disabled = true;
    configureReviewNavigation(attempt);
}

function consumeDashboardLaunch() {
    let launch = null;
    try {
        launch = JSON.parse(localStorage.getItem(DASHBOARD_FULL_MOCK_KEY) || "null");
    } catch {
        launch = null;
    }

    if (!launch || launch.testId !== "test2" || !launch.verified) {
        return false;
    }

    localStorage.removeItem(DASHBOARD_FULL_MOCK_KEY);
    state = defaultState();
    state.started = true;
    state.paused = true;
    state.candidateName = launch.candidateName || App.getUser()?.name || "Candidate";
    saveState();
    openExamView();
    showOverlay(elements.examIntroOverlay);
    return true;
}

function restoreResumeModeIfNeeded() {
    if (!state.started || state.finished) {
        openLobbyView();
        return;
    }
    openExamView();
    if (!state.paused) {
        startTimer();
        tryPlayListeningAudio();
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    App.requireAuth();

    if (window.EmeraldFirebaseBridge) {
        await EmeraldFirebaseBridge.ready();
    }

    cacheElements();
    state = loadState();
    cacheReadingTemplates();

    setAudioReadyState();
    buildListeningGrid();
    buildReadingGrid();
    bindListeningInputs();
    bindReadingInputs();
    bindWritingInputs();
    bindNavigation();
    bindAccessFlow();
    bindSecurity();
    restoreListeningAnswers();
    restoreReadingAnswers();
    renderWritingTask();
    renderWritingMetrics();

    if (REVIEW_ATTEMPT_ID) {
        const attempt = await loadReviewAttemptById(REVIEW_ATTEMPT_ID);
        if (!attempt) {
            alert("Review attempt not found.");
            window.location.href = FULL_MOCK_TWO_CONFIG.paths.dashboardPage;
            return;
        }
        applyReviewMode(attempt);
        return;
    }

    if (consumeDashboardLaunch()) {
        return;
    }

    restoreResumeModeIfNeeded();
});
