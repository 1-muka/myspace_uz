(function (global) {
    "use strict";

    if (global.EmeraldWritingAI) return;

    const DAILY_KEY_PREFIX = "emerald_writing_ai_check";

    function roundHalf(value) {
        return Math.round(value * 2) / 2;
    }

    function clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    }

    function getUserName() {
        try {
            const user = JSON.parse(localStorage.getItem("user") || "{}");
            return String(user.name || "student").trim().toLowerCase();
        } catch {
            return "student";
        }
    }

    function getTodayKey() {
        const today = new Date().toISOString().slice(0, 10);
        return `${DAILY_KEY_PREFIX}_${getUserName()}_${today}`;
    }

    function canUseToday() {
        const key = getTodayKey();
        return !localStorage.getItem(key);
    }

    function consumeToday() {
        localStorage.setItem(getTodayKey(), new Date().toISOString());
    }

    function countWords(text) {
        const words = String(text || "").trim().match(/\S+/g);
        return words ? words.length : 0;
    }

    function countSentences(text) {
        const sentences = String(text || "").match(/[.!?]+/g);
        return sentences ? sentences.length : 0;
    }

    function lexicalVariety(text) {
        const words = String(text || "").toLowerCase().match(/[a-z']+/g) || [];
        if (!words.length) return 0;
        const unique = new Set(words).size;
        return unique / words.length;
    }

    function scoreTask(text, minWords) {
        const words = countWords(text);
        if (words < 5) return { band: 0, words };

        let score = 4.0;
        const ratio = words / minWords;
        if (ratio >= 1.0) score += 1.5;
        else if (ratio >= 0.8) score += 1.0;
        else if (ratio >= 0.6) score += 0.5;

        const sentences = countSentences(text);
        if (sentences >= 4) score += 0.6;
        if (sentences >= 7) score += 0.4;

        const variety = lexicalVariety(text);
        if (variety >= 0.45) score += 0.8;
        else if (variety >= 0.35) score += 0.5;
        else if (variety >= 0.25) score += 0.2;

        const paragraphs = String(text || "").split(/\n\s*\n/).filter(Boolean).length;
        if (paragraphs >= 2) score += 0.4;
        if (paragraphs >= 3) score += 0.3;

        score = clamp(score, 0, 9);
        return { band: roundHalf(score), words };
    }

    function evaluateWriting(task1Text, task2Text) {
        const task1 = scoreTask(task1Text, 150);
        const task2 = scoreTask(task2Text, 250);
        const overall = roundHalf((task1.band + task2.band * 2) / 3);
        return {
            task1Band: task1.band,
            task2Band: task2.band,
            overallBand: overall,
            task1Words: task1.words,
            task2Words: task2.words
        };
    }

    function getRemoteEndpoint() {
        return global.EMERALD_WRITING_AI_ENDPOINT || "";
    }

    async function evaluateWritingAsync(task1Text, task2Text) {
        const fallback = evaluateWriting(task1Text, task2Text);
        const endpoint = getRemoteEndpoint();
        if (!endpoint) return fallback;

        try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    task1Text,
                    task2Text,
                    mode: "ielts_band_only"
                })
            });
            if (!response.ok) return fallback;
            const data = await response.json();
            const t1 = Number(data.task1Band);
            const t2 = Number(data.task2Band);
            const overall = Number(data.overallBand);
            if (![t1, t2, overall].every(Number.isFinite)) return fallback;
            return {
                task1Band: roundHalf(clamp(t1, 0, 9)),
                task2Band: roundHalf(clamp(t2, 0, 9)),
                overallBand: roundHalf(clamp(overall, 0, 9)),
                task1Words: fallback.task1Words,
                task2Words: fallback.task2Words
            };
        } catch {
            return fallback;
        }
    }

    global.EmeraldWritingAI = {
        canUseToday,
        consumeToday,
        evaluateWriting,
        evaluateWritingAsync
    };
})(window);
