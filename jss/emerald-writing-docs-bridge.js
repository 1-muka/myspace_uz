(function (global) {
    "use strict";

    var WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbxefO0UHTH6eGQUXecvTdrew5MmVDWnZLsQ9Wmntf24LISlrJ5SWLmlM0iazRxnioTD1A/exec";
    var API_KEY = "emerald2026";

    function buildTaskPayload(payload) {
        return {
            apiKey: API_KEY,
            username: payload.username || "",
            task: payload.task || "",
            submittedAt: payload.submittedAt || new Date().toISOString(),
            essay: payload.essay || "",
            testId: payload.testId || "",
            mode: payload.mode || "full_mock"
        };
    }

    async function saveWritingSubmission(payload) {
        if (!WEBHOOK_URL) {
            console.warn("EmeraldWritingDocsBridge: WEBHOOK_URL is not configured.");
            return { success: false, skipped: true, error: "WEBHOOK_URL is not configured." };
        }

        var body = JSON.stringify(buildTaskPayload(payload || {}));

        try {
            var response = await global.fetch(WEBHOOK_URL, {
                method: "POST",
                redirect: "follow",
                headers: { "Content-Type": "text/plain;charset=utf-8" },
                body: body
            });

            var text = await response.text();
            var result = text ? JSON.parse(text) : {};

            if (!result.success) {
                console.warn("EmeraldWritingDocsBridge: Apps Script returned an error", result);
            }

            return result;
        } catch (error) {
            console.error("EmeraldWritingDocsBridge: Google Docs upload failed", error);
            return { success: false, error: String(error && error.message ? error.message : error) };
        }
    }

    async function saveFullMockWritingSubmissions(payload) {
        var submittedAt = payload.submittedAt || new Date().toISOString();
        var username = payload.username || "";
        var testId = payload.testId || "";
        var taskPrefix = payload.taskPrefix || testId || "Full Mock";
        var answers = payload.answers || {};

        var uploads = await Promise.allSettled([
            saveWritingSubmission({
                username: username,
                task: taskPrefix + " - Writing Task 1",
                submittedAt: submittedAt,
                essay: answers.task1 || "",
                testId: testId,
                mode: "full_mock"
            }),
            saveWritingSubmission({
                username: username,
                task: taskPrefix + " - Writing Task 2",
                submittedAt: submittedAt,
                essay: answers.task2 || "",
                testId: testId,
                mode: "full_mock"
            })
        ]);

        return {
            task1Url: uploads[0].status === "fulfilled" && uploads[0].value.success ? uploads[0].value.documentUrl : null,
            task2Url: uploads[1].status === "fulfilled" && uploads[1].value.success ? uploads[1].value.documentUrl : null
        };
    }

    global.EmeraldWritingDocsBridge = {
        WEBHOOK_URL: WEBHOOK_URL,
        API_KEY: API_KEY,
        saveWritingSubmission: saveWritingSubmission,
        saveFullMockWritingSubmissions: saveFullMockWritingSubmissions
    };
})(window);
