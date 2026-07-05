(function (global) {
    "use strict";

    var WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbz4fgYKszwMh197Uk7K7q3A2r9aW2wAVh-IC1ZJqoY4AEMSDbywQmmuasb8D38eBsEsaQ/exec";
    var API_KEY = "emerald2026";
    var IFRAME_NAME = "emeraldSheetsBridgeFrame";

    function ensureHiddenFrame() {
        var iframe = document.getElementById(IFRAME_NAME);
        if (iframe) {
            return iframe;
        }

        iframe = document.createElement("iframe");
        iframe.name = IFRAME_NAME;
        iframe.id = IFRAME_NAME;
        iframe.style.display = "none";
        iframe.setAttribute("aria-hidden", "true");
        document.body.appendChild(iframe);
        return iframe;
    }

    function postViaHiddenForm(body) {
        ensureHiddenFrame();

        var form = document.createElement("form");
        form.method = "POST";
        form.action = WEBHOOK_URL;
        form.target = IFRAME_NAME;
        form.style.display = "none";

        var input = document.createElement("input");
        input.type = "hidden";
        input.name = "payload";
        input.value = body;
        form.appendChild(input);

        document.body.appendChild(form);
        form.submit();

        setTimeout(function () {
            form.remove();
        }, 4000);
    }

    function saveFullMockResult(payload) {
        if (!WEBHOOK_URL) {
            return;
        }

        var body = JSON.stringify({
            type: "full_mock_result",
            apiKey: API_KEY,
            date: payload.date || new Date().toISOString(),
            userName: payload.userName || "",
            testId: payload.testId || "",
            listeningBand: payload.listeningBand ?? "",
            readingBand: payload.readingBand ?? "",
            writingBand: payload.writingBand ?? "",
            overallBand: payload.overallBand ?? "",
            listeningScore: payload.listeningScore ?? "",
            readingScore: payload.readingScore ?? ""
        });

        // Hidden form POST is the most reliable way to reach Google Apps Script
        // (sendBeacon and fetch often fail silently on GAS redirects).
        try {
            postViaHiddenForm(body);
        } catch (error) {
            console.error("EmeraldSheetsBridge: form post failed", error);
        }

        // Secondary attempt — does not block the UI.
        if (global.fetch) {
            global.fetch(WEBHOOK_URL, {
                method: "POST",
                redirect: "follow",
                keepalive: true,
                headers: { "Content-Type": "text/plain;charset=utf-8" },
                body: body
            }).catch(function (fetchError) {
                console.warn("EmeraldSheetsBridge: fetch fallback failed", fetchError);
            });
        }
    }

    global.EmeraldSheetsBridge = {
        WEBHOOK_URL: WEBHOOK_URL,
        API_KEY: API_KEY,
        saveFullMockResult: saveFullMockResult
    };
})(window);
