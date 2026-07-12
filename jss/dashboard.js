document.addEventListener("DOMContentLoaded", () => {
    App.requireAuth();

    const user = App.getUser();
    const userName = user && user.name ? user.name : "Student";
    const userInitial = userName.charAt(0).toUpperCase();
    const POST_LOGIN_SYNC_KEY = "emerald_post_login_sync_pending";

    const AGREEMENT_PHRASE = "I agree to take the test honestly and will not cheat or share materials.";
    const FULL_MOCK_RATING_PASSWORD = "Mukagali0307/";
    const FULL_MOCK_RATING_UNLOCK_KEY = "emerald_full_mock_rating_unlocked";

    const accessCodes = {
        writing: { test1: "writing777" },
        mock: { test1: "MOCK777", test2: "MOCK222", test3: "MOCK333", test4: "MOCK444" },
        listening: { test1: "EMERALD1", test2: "EMERALD2", test3: "EMERALD3", test4: "EMERALD4", test5: "EMERALD5", test6: "EMERALD6", test7: "EMERALD7", test8: "EMERALD8", test9: "EMERALD9", test10: "EMERALD10" },
        reading: { test1: "READ1", test2: "READ2", test3: "READ3", test4: "READ4", test5: "READ5", test6: "READ6", test7: "READ7", test8: "READ8", test9: "READ9" }
    };

    document.querySelectorAll("[data-user-name]").forEach(el => el.textContent = userName);
    document.querySelectorAll("[data-user-initial]").forEach(el => el.textContent = userInitial);

    function runPostLoginSyncInBackground() {
        if (localStorage.getItem(POST_LOGIN_SYNC_KEY) !== "1") {
            return;
        }

        setTimeout(async () => {
            try {
                if (window.EmeraldFirebaseBridge) {
                    await EmeraldFirebaseBridge.connectTrackerToFirestore();
                }

                await EmeraldTracker.ensureUser({
                    id: App.getUser()?.id || App.createStableUserId(userName),
                    name: userName,
                    email: App.getUser()?.email || ""
                });

                if (window.EmeraldFirebaseBridge) {
                    await EmeraldFirebaseBridge.syncLocalResultsForCurrentUser();
                }
            } catch (error) {
                console.error("Post-login sync failed:", error);
            } finally {
                localStorage.removeItem(POST_LOGIN_SYNC_KEY);
            }
        }, 0);
    }

    const viewMeta = {
        overview:  { kicker: "Dashboard",     title: `Welcome back, ${userName}`, subtitle: "Every step you take today builds the results you want tomorrow." },
        listening: { kicker: "Practice Area", title: "Listening Exams",           subtitle: "Great listeners catch what others miss." },
        reading:   { kicker: "Practice Area", title: "Reading Exams",             subtitle: "Every passage is a chance to improve." },
        writing:   { kicker: "Practice Area", title: "Writing Practice",          subtitle: "Every sentence should serve a purpose." },
        speaking:  { kicker: "Practice Area", title: "Speaking Practice",         subtitle: "Confidence comes with practice." },
        mock:      { kicker: "Practice Area", title: "Full Mock",                 subtitle: "Test your limits under real conditions." },
        samples:   { kicker: "Practice Area", title: "Band 9 Samples",            subtitle: "Learn from perfection. Aim for Band 9." }
    };

    const pageKicker   = document.getElementById("pageKicker");
    const pageTitle    = document.getElementById("pageTitle");
    const pageSubtitle = document.getElementById("pageSubtitle");

    const sidebarButtons = document.querySelectorAll(".sidebar-link[data-view]");
    const switchButtons  = document.querySelectorAll("[data-view-target]");

    const modal                 = document.getElementById("examSecurityModal");
    const securityModalTitle    = document.getElementById("securityModalTitle");
    const securityNameInput     = document.getElementById("securityNameInput");
    const securityCodeInput     = document.getElementById("securityCodeInput");
    const securityAgreementInput = document.getElementById("securityAgreementInput");
    const securityRequiredPhrase = document.getElementById("securityRequiredPhrase");
    const securityModalError    = document.getElementById("securityModalError");
    const securityStartBtn      = document.getElementById("securityStartBtn");
    const mockRatingContent     = document.getElementById("mockLeaderboard");
    const mockRatingLock        = document.getElementById("mockRatingLock");
    const mockRatingPassword    = document.getElementById("mockRatingPassword");
    const mockRatingUnlockBtn   = document.getElementById("mockRatingUnlockBtn");
    const mockRatingError       = document.getElementById("mockRatingError");

    let pendingLaunch = null;

    function isFullMockRatingUnlocked() {
        return sessionStorage.getItem(FULL_MOCK_RATING_UNLOCK_KEY) === "1";
    }

    function setFullMockRatingUnlocked(unlocked) {
        if (!mockRatingContent || !mockRatingLock) return;

        mockRatingContent.classList.toggle("locked", !unlocked);
        mockRatingLock.classList.toggle("hidden", unlocked);

        if (unlocked) {
            sessionStorage.setItem(FULL_MOCK_RATING_UNLOCK_KEY, "1");
            if (mockRatingPassword) mockRatingPassword.value = "";
            if (mockRatingError) mockRatingError.textContent = "";
        }
    }

    function setupFullMockRatingGate() {
        if (!mockRatingContent || !mockRatingLock || !mockRatingPassword || !mockRatingUnlockBtn) {
            return;
        }

        setFullMockRatingUnlocked(isFullMockRatingUnlocked());

        function unlockFullMockRating() {
            if (mockRatingPassword.value === FULL_MOCK_RATING_PASSWORD) {
                setFullMockRatingUnlocked(true);
                return;
            }

            if (mockRatingError) {
                mockRatingError.textContent = "Incorrect password.";
            }
            mockRatingPassword.select();
        }

        mockRatingUnlockBtn.addEventListener("click", unlockFullMockRating);
        mockRatingPassword.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                unlockFullMockRating();
            }
        });
    }

    function showView(viewName) {
        sidebarButtons.forEach(btn => btn.classList.toggle("active", btn.dataset.view === viewName));
        document.querySelectorAll(".dashboard-view").forEach(sec => sec.classList.toggle("active", sec.dataset.viewContent === viewName));
        const meta = viewMeta[viewName] || viewMeta.overview;
        pageKicker.textContent   = meta.kicker;
        pageTitle.textContent    = meta.title;
        pageSubtitle.textContent = meta.subtitle;
    }

    function launchExam(launchData, candidateName) {
        localStorage.setItem("exam", JSON.stringify({
            type: launchData.examType,
            test: launchData.testId,
            candidateName
        }));

        if (launchData.examType === "mock") {
            localStorage.setItem("dashboardFullMockLaunch", JSON.stringify({
                candidateName,
                testId: launchData.testId,
                skipAccess: true,
                verified: true
            }));
        }

        window.location.href = launchData.route;
    }

    function openSecurityModal(button) {
        pendingLaunch = { examType: button.dataset.examType, testId: button.dataset.testId, route: button.dataset.route };
        const examLabels = { listening: "Start Listening Exam", reading: "Start Reading Exam", writing: "Start Writing Mock", mock: "Start Full Mock" };
        securityModalTitle.textContent    = examLabels[pendingLaunch.examType] || "Start Exam";
        securityRequiredPhrase.textContent = AGREEMENT_PHRASE;
        securityNameInput.value           = userName;
        securityCodeInput.value           = "";
        securityAgreementInput.value      = "";
        securityModalError.textContent    = "";
        modal.classList.remove("hidden");
        securityNameInput.focus();
    }

    function closeSecurityModal() {
        modal.classList.add("hidden");
        securityModalError.textContent = "";
        pendingLaunch = null;
    }

   function validateAndLaunch() {
    if (!pendingLaunch) return;

    const name = securityNameInput.value.trim();
    const code = securityCodeInput.value.trim();
    const agreement = securityAgreementInput.value.trim();
    const requiredCode = accessCodes[pendingLaunch.examType]?.[pendingLaunch.testId];

    securityModalError.textContent = "";

    if (!name) {
        securityModalError.textContent = "Enter your name.";
        return;
    }

    if (requiredCode && code !== requiredCode) {
        securityModalError.textContent = "Invalid access code.";
        return;
    }

    if (agreement !== AGREEMENT_PHRASE) {
        securityModalError.textContent = "Type the agreement sentence exactly.";
        return;
    }

    launchExam(pendingLaunch, name);
}

    sidebarButtons.forEach(btn => btn.addEventListener("click", () => showView(btn.dataset.view)));
    switchButtons.forEach(btn => btn.addEventListener("click", () => showView(btn.dataset.viewTarget)));
    document.querySelectorAll("[data-secure-launch='true']").forEach(btn => {
        btn.addEventListener("click", () => {
            const launchData = {
                examType: btn.dataset.examType,
                testId: btn.dataset.testId,
                route: btn.dataset.route
            };

            if (launchData.examType === "mock") {
                openSecurityModal(btn);
                return;
            }

            launchExam(launchData, userName);
        });
    });

    securityStartBtn.addEventListener("click", validateAndLaunch);
    modal.addEventListener("click", e => { if (e.target === modal) closeSecurityModal(); });
    document.addEventListener("keydown", e => {
        if (modal.classList.contains("hidden")) return;
        if (e.key === "Escape") closeSecurityModal();
        if (e.key === "Enter")  validateAndLaunch();
    });

    document.getElementById("logoutBtn").addEventListener("click", () => {
        App.logout().catch(console.error);
    });
    const openAdminBtn = document.getElementById("openAdminBtn");
    if (openAdminBtn) {
        openAdminBtn.addEventListener("click", () => {
            window.location.href = "admin.html";
        });
    }

    showView("overview");
    setupFullMockRatingGate();
    runPostLoginSyncInBackground();
    loadDashboard();
});


// ─── HELPERS ────────────────────────────────────────────────────────────────

function buildSectionRanking(allResults, section) {
    const latestByUser = {};

    allResults
        .filter(r => r.section === section && r.mode !== "full_mock" && Number.isFinite(Number(r.band)))
        .forEach(r => {
            const key = r.userId || r.userName;
            const current = latestByUser[key];
            const nextTime = new Date(r.createdAt || 0).getTime();
            const currentTime = current ? new Date(current.createdAt || 0).getTime() : -Infinity;
            if (!current || nextTime >= currentTime) {
                latestByUser[key] = r;
            }
        });

    return Object.values(latestByUser)
        .map(r => ({
            userName: r.userName,
            averageBand: Number(r.band)
        }))
        .sort((a, b) => b.averageBand - a.averageBand);
}

const RANKING_DISPLAY_LIMIT = 20;

function renderRankingList(containerId, ranked, currentUserName, emptyMsg) {
    const el = document.getElementById(containerId);
    if (!el) return;

    if (ranked.length === 0) {
        el.innerHTML = `<p style="color:#888;font-size:13px">${emptyMsg}</p>`;
        return;
    }

    const medals = ["🥇", "🥈", "🥉"];

    el.innerHTML = ranked.slice(0, RANKING_DISPLAY_LIMIT).map((u, i) => {
        const isMe = u.userName.toLowerCase() === currentUserName.toLowerCase();
        const medal = medals[i] || `${i + 1}.`;
        const band = u.averageBand;
        const bandColor = band >= 8 ? "#0b3d2e" : band >= 7 ? "#0d8a5e" : band >= 6 ? "#d8b15a" : "#e07070";

        return `
            <div style="
                display:flex;
                align-items:center;
                gap:10px;
                padding:9px 10px;
                border-radius:10px;
                margin-bottom:5px;
                background:${isMe ? "rgba(13,138,94,0.08)" : "transparent"};
                border:${isMe ? "1px solid rgba(13,138,94,0.2)" : "1px solid transparent"};
            ">
                <span style="font-size:16px;width:26px;text-align:center">${medal}</span>
                <span style="flex:1;font-weight:${isMe ? "700" : "500"};font-size:14px;color:${isMe ? "#0b3d2e" : "#333"}">${u.userName}${isMe ? " (you)" : ""}</span>
                <span style="
                    background:${bandColor};
                    color:white;
                    border-radius:8px;
                    padding:3px 11px;
                    font-size:13px;
                    font-weight:700;
                    min-width:58px;
                    text-align:center;
                ">Band ${band}</span>
            </div>
        `;
    }).join("");
}


// ─── MAIN LOAD ───────────────────────────────────────────────────────────────

const SECTION_REVIEW_ROUTES = {
    listening: {
        test1: "listening-test1.html",
        test2: "listening-test2.html",
        test3: "listening-test3.html",
        test4: "listening-test4.html",
        test5: "listening-test5.html",
        test6: "listening-test6.html",
        test7: "listening-test7.html",
        test8: "listening-test8.html",
        test9: "listening-test9.html",
        test10: "listening-test10.html"
    },
    reading: {
        test1: "reading-test1.html",
        test2: "reading-test2.html",
        test3: "reading-test3.html",
        test4: "reading-test4.html",
        test5: "reading-test5.html",
        test6: "reading-test6.html",
        test7: "reading-test7.html",
        test8: "reading-test8.html",
        test9: "reading-test9.html"
    },
    writing: {
        test1: "writing-mock.html"
    }
};

const FULL_MOCK_REVIEW_ROUTES = {
    test1: "full-mock.html",
    "full-mock-test1": "full-mock.html",
    test2: "full-mock-test2.html",
    "full-mock-test2": "full-mock-test2.html",
    test3: "full-mock-test3.html",
    "full-mock-test3": "full-mock-test3.html",
    test4: "full-mock-test4.html",
    "full-mock-test4": "full-mock-test4.html"
};

function escapeHtml(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function getReviewHref(result) {
    if (!result || !result.id) return "";

    const section = String(result.section || "").toLowerCase();
    const testId = String(result.testId || "test1");
    const route = result.isFullMock || result.kind === "fullMock" || section === "full mock" || section === "full_mock"
        ? FULL_MOCK_REVIEW_ROUTES[testId] || FULL_MOCK_REVIEW_ROUTES.test1
        : SECTION_REVIEW_ROUTES[section]?.[testId] || SECTION_REVIEW_ROUTES[section]?.test1 || "";

    return route ? `${route}?review=${encodeURIComponent(result.id)}` : "";
}

function formatAttemptLabel(result) {
    const section = String(result.section || "attempt").replace(/_/g, " ");
    const test = result.testId ? ` - ${String(result.testId).replace(/-/g, " ")}` : "";
    return `${section}${test}`;
}

function formatBand(value) {
    return Number.isFinite(Number(value)) ? Number(value) : "-";
}

function renderRecentAttempt(result) {
    const href = getReviewHref(result);
    const label = escapeHtml(formatAttemptLabel(result));
    const link = href
        ? `<a href="${href}" style="color:#0d8a5e;text-decoration:none;">${label} (review)</a>`
        : label;

    return `
        <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid #eee">
            <span style="font-weight:600;text-transform:capitalize">${link}</span>
            <span style="background:#0d8a5e;color:white;border-radius:8px;padding:4px 12px;font-weight:700">Band ${formatBand(result.band)}</span>
        </div>
    `;
}

async function loadDashboard() {
    try {
        if (window.EmeraldFirebaseBridge) {
            await EmeraldFirebaseBridge.ready();
        }

        const user     = App.getUser();
        const userName = user?.name || "Student";
        const userId   = user?.id || App.createStableUserId(userName);

        const [
            allResults,
            allMockResults,
            sectionStats,
            insights
        ] = await Promise.all([
            EmeraldTracker.getAllSectionResults(),
            EmeraldTracker.getAllFullMockResults(),
            EmeraldTracker.getSectionStats(),
            EmeraldTracker.getPlatformInsights()
        ]);
        const combined = Array.isArray(allResults)
            ? allResults.filter(result => result.mode !== "full_mock")
            : [];

        // ── LISTENING RANKING ────────────────────────────────────────────────
        const listeningRanked = buildSectionRanking(combined, "listening");
        renderRankingList("listeningLeaderboard", listeningRanked, userName, "No listening results yet.");

        // ── READING RANKING ──────────────────────────────────────────────────
        const readingRanked = buildSectionRanking(combined, "reading");
        renderRankingList("readingLeaderboard", readingRanked, userName, "No reading results yet.");

        // ── WRITING RANKING ──────────────────────────────────────────────────
        const writingRanked = buildSectionRanking(combined, "writing");
        renderRankingList("writingLeaderboard", writingRanked, userName, "No writing results yet.");

        // ── FULL MOCK RANKING ────────────────────────────────────────────────
        function toIELTSBand(rawValue) {
            return Math.round(Number(rawValue) * 2) / 2;
        }

        const latestMockByUser = {};
        allMockResults.forEach(r => {
            const key = r.userId || r.userName;
            const current = latestMockByUser[key];
            const nextTime = new Date(r.createdAt || 0).getTime();
            const currentTime = current ? new Date(current.createdAt || 0).getTime() : -Infinity;
            if (!current || nextTime >= currentTime) {
                latestMockByUser[key] = r;
            }
        });

        const mockRanked = Object.values(latestMockByUser)
            .map(r => {
                const sectionBands = [r.listeningBand, r.readingBand, r.writingBand]
                    .map(Number)
                    .filter(Number.isFinite);
                const fallbackBand = sectionBands.length
                    ? toIELTSBand(sectionBands.reduce((a, b) => a + b, 0) / sectionBands.length)
                    : null;
                return {
                    userName: r.userName,
                    averageBand: Number.isFinite(Number(r.overallBand)) ? Number(r.overallBand) : fallbackBand
                };
            })
            .filter(r => Number.isFinite(r.averageBand))
            .sort((a, b) => b.averageBand - a.averageBand);

        renderRankingList("mockLeaderboard", mockRanked, userName, "No full mock results yet. Complete a full mock to appear here.");

        // ── RECENT RESULTS ───────────────────────────────────────────────────
        const matchesCurrentUser = (r) =>
            (r.userId || "").toLowerCase() === String(userId).toLowerCase() ||
            (r.userName || "").toLowerCase() === userName.toLowerCase();

        const mySectionResults = allResults
            .filter(r => matchesCurrentUser(r) && r.mode !== "full_mock")
            .map(r => ({ ...r, kind: "section" }));
        const myMockResults = (allMockResults || []).filter(r =>
            matchesCurrentUser(r)
        ).map(r => ({
            id: r.id,
            kind: "fullMock",
            section: "full mock",
            testId: r.testId || "test1",
            band: r.overallBand,
            createdAt: r.createdAt,
            isFullMock: true
        }));

        const myResults = [...mySectionResults, ...myMockResults]
            .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
            .slice(0, 10);

        const recentDiv = document.getElementById("recentResults");
        if (recentDiv) {
            recentDiv.innerHTML = myResults.length === 0
                ? "<p style='color:#888'>No results yet. Complete a test to see your scores here.</p>"
                : myResults.map(r => `
                    <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid #eee">
                        <span style="font-weight:600;text-transform:capitalize">
                            ${r.section === "reading"
                                ? `<a href="${({ test2: "reading-test2.html", test3: "reading-test3.html", test4: "reading-test4.html", test5: "reading-test5.html", test6: "reading-test6.html", test7: "reading-test7.html", test8: "reading-test8.html", test9: "reading-test9.html" }[r.testId] || "reading-test1.html")}?review=${encodeURIComponent(r.id || "")}" style="color:#0d8a5e;text-decoration:none;">${r.section} — ${r.testId || ""} (review)</a>`
                                : r.section === "listening"
                                    ? `<a href="${({ test2: "listening-test2.html", test3: "listening-test3.html", test4: "listening-test4.html", test5: "listening-test5.html", test6: "listening-test6.html", test7: "listening-test7.html", test8: "listening-test8.html", test9: "listening-test9.html", test10: "listening-test10.html", "full-mock-test2": "full-mock-test2.html", "full-mock-test3": "full-mock-test3.html", "full-mock-test4": "full-mock-test4.html" }[r.testId] || "listening-test1.html")}?review=${encodeURIComponent(r.id || "")}" style="color:#0d8a5e;text-decoration:none;">${r.section} — ${r.testId || ""} (review)</a>`
                                    : r.section === "writing"
                                        ? `<a href="writing-mock.html?review=${encodeURIComponent(r.id || "")}" style="color:#0d8a5e;text-decoration:none;">${r.section} — ${r.testId || ""} (review)</a>`
                                        : r.section === "full mock"
                                            ? `<a href="${({ test2: "full-mock-test2.html", test3: "full-mock-test3.html", test4: "full-mock-test4.html" }[r.testId] || "full-mock.html")}?review=${encodeURIComponent(r.id || "")}" style="color:#0d8a5e;text-decoration:none;">${r.section} — ${r.testId || ""} (review)</a>`
                                            : `${r.section} — ${r.testId || ""}`
                            }
                        </span>
                        <span style="background:#0d8a5e;color:white;border-radius:8px;padding:4px 12px;font-weight:700">Band ${r.band}</span>
                    </div>
                `).join("");
            if (myResults.length > 0) {
                recentDiv.innerHTML = myResults.map(renderRecentAttempt).join("");
            }
        }

        // ── WEAK / STRONG ────────────────────────────────────────────────────
        const latestStats = sectionStats.filter(s => Number.isFinite(s.latestBand));
        const weakStrong = latestStats.length
            ? {
                weakest: latestStats.slice().sort((a, b) => a.latestBand - b.latestBand)[0],
                strongest: latestStats.slice().sort((a, b) => b.latestBand - a.latestBand)[0]
            }
            : { weakest: null, strongest: null };

        const weakBand   = weakStrong.weakest?.latestBand;
        const strongBand = weakStrong.strongest?.latestBand;
        const weakEl   = document.getElementById("weakSection");
        const strongEl = document.getElementById("strongSection");
        if (weakEl) {
            weakEl.innerHTML = weakStrong.weakest
                ? `<span class="strength-label weak">Weakest</span><strong>${weakStrong.weakest.section}</strong><span class="strength-band">Band ${weakBand}</span>`
                : `<span class="strength-empty">Complete more tests to see weak areas.</span>`;
        }
        if (strongEl) {
            strongEl.innerHTML = weakStrong.strongest
                ? `<span class="strength-label strong">Strongest</span><strong>${weakStrong.strongest.section}</strong><span class="strength-band">Band ${strongBand}</span>`
                : "";
        }

        const insightsEl = document.getElementById("platformInsights");
        if (insightsEl) {
            insightsEl.innerHTML = `
                <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px;">
                    <div style="background:#f8fbf9;border:1px solid #e5efe9;border-radius:10px;padding:10px;">
                        <small>Total users</small>
                        <div style="font-weight:800;font-size:20px;">${insights.totalUsers}</div>
                    </div>
                    <div style="background:#f8fbf9;border:1px solid #e5efe9;border-radius:10px;padding:10px;">
                        <small>Section attempts</small>
                        <div style="font-weight:800;font-size:20px;">${insights.totalSectionAttempts}</div>
                    </div>
                    <div style="background:#f8fbf9;border:1px solid #e5efe9;border-radius:10px;padding:10px;">
                        <small>Full mocks</small>
                        <div style="font-weight:800;font-size:20px;">${insights.totalFullMocks}</div>
                    </div>
                    <div style="background:#f8fbf9;border:1px solid #e5efe9;border-radius:10px;padding:10px;">
                        <small>Avg latest band</small>
                        <div style="font-weight:800;font-size:20px;">${Number.isFinite(insights.averageLatestSectionBand) ? insights.averageLatestSectionBand.toFixed(1) : "-"}</div>
                    </div>
                </div>
            `;
        }

    } catch (err) {
        console.error("loadDashboard error:", err);
    }
}

function showReloadToast(message = "Ratings reloaded") {
    const toast = document.getElementById("reloadToast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.remove("hidden");
    toast.classList.add("show");
    clearTimeout(showReloadToast._timer);
    showReloadToast._timer = setTimeout(() => {
        toast.classList.remove("show");
        toast.classList.add("hidden");
    }, 1800);
}

document.addEventListener("DOMContentLoaded", () => {
    const reloadBtn = document.getElementById("reloadDashboardBtn");
    if (!reloadBtn) return;
    reloadBtn.addEventListener("click", async () => {
        await loadDashboard();
        showReloadToast("Ratings reloaded");
    });
});
