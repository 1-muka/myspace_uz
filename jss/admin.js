(function () {
    "use strict";

    function byId(id) {
        return document.getElementById(id);
    }

    function log(message) {
        byId("adminLog").textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
    }

    function downloadFile(name, text, type) {
        var blob = new Blob([text], { type: type });
        var url = URL.createObjectURL(blob);
        var anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = name;
        anchor.click();
        URL.revokeObjectURL(url);
    }

    async function refreshStats() {
        var stats = await EmeraldTracker.getPlatformInsights();
        byId("totalUsers").textContent = stats.totalUsers;
        byId("totalSections").textContent = stats.totalSectionAttempts;
        byId("totalMocks").textContent = stats.totalFullMocks;
        byId("avgLatestBand").textContent = Number.isFinite(stats.averageLatestSectionBand)
            ? stats.averageLatestSectionBand.toFixed(1)
            : "-";
        log("Dashboard stats refreshed.");
    }

    function setupEvents() {
        byId("refreshBtn").addEventListener("click", refreshStats);

        byId("exportJsonBtn").addEventListener("click", function () {
            var payload = EmeraldTracker.exportLocalDatabase();
            downloadFile("emerald-tracker-export.json", JSON.stringify(payload, null, 2), "application/json");
            log("JSON exported.");
        });

        byId("exportCsvBtn").addEventListener("click", function () {
            var csv = EmeraldTracker.exportResultsCsv();
            downloadFile("emerald-results.csv", csv, "text/csv;charset=utf-8;");
            log("CSV exported.");
        });

        var importInput = byId("importFile");
        byId("importJsonBtn").addEventListener("click", function () {
            importInput.value = "";
            importInput.click();
        });

        importInput.addEventListener("change", function (event) {
            var file = event.target.files && event.target.files[0];
            if (!file) return;
            var reader = new FileReader();
            reader.onload = function () {
                try {
                    var parsed = JSON.parse(String(reader.result || "{}"));
                    EmeraldTracker.importLocalDatabase(parsed);
                    refreshStats();
                    log("JSON imported successfully.");
                } catch (error) {
                    log("Import failed: invalid JSON format.");
                }
            };
            reader.readAsText(file);
        });

        byId("backBtn").addEventListener("click", function () {
            window.location.href = "dashboard.html";
        });
    }

    document.addEventListener("DOMContentLoaded", function () {
        if (window.App) App.requireAuth();
        setupEvents();
        refreshStats();
    });
})();
