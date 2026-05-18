(function (global) {
    "use strict";

    if (global.EmeraldFirebaseBridge) {
        return;
    }

    var DB_KEY = "emerald_tracker_db_v1";
    var SYNC_PREFIX = "emerald_firestore_sync_v1:";

    function parseJson(raw, fallback) {
        try {
            return JSON.parse(raw);
        } catch {
            return fallback;
        }
    }

    function getCurrentLocalUser() {
        if (!global.App || typeof global.App.getUser !== "function") {
            return null;
        }

        return global.App.getUser();
    }

    function normalizeText(value) {
        return String(value || "").trim().toLowerCase();
    }

    function readLegacyDatabase() {
        var db = parseJson(global.localStorage.getItem(DB_KEY), null);
        if (!db || typeof db !== "object") {
            return null;
        }

        return {
            users: db.users && typeof db.users === "object" ? db.users : {},
            sectionResults: Array.isArray(db.sectionResults) ? db.sectionResults : [],
            fullMockResults: Array.isArray(db.fullMockResults) ? db.fullMockResults : [],
            practiceEvents: Array.isArray(db.practiceEvents) ? db.practiceEvents : []
        };
    }

    async function connectTrackerToFirestore() {
        if (!global.EmeraldFirebase || !global.EmeraldTracker || !global.createEmeraldFirestoreStore) {
            return false;
        }

        await global.EmeraldTracker.setStore(
            global.createEmeraldFirestoreStore(global.EmeraldFirebase.firestore)
        );
        return true;
    }

    function matchesCurrentUser(record, currentUser) {
        if (!record || !currentUser) {
            return false;
        }

        var currentName = normalizeText(currentUser.name);
        var recordName = normalizeText(record.userName);

        return Boolean(currentName) && currentName === recordName;
    }

    function withCurrentUser(record, currentUser) {
        return {
            ...record,
            userId: currentUser.id,
            userName: currentUser.name
        };
    }

    async function syncLocalResultsForCurrentUser() {
        if (!global.EmeraldFirebase || !global.createEmeraldFirestoreStore) {
            return { synced: false, reason: "firebase_unavailable" };
        }

        var currentUser = getCurrentLocalUser();
        if (!currentUser || !currentUser.id || !currentUser.name) {
            return { synced: false, reason: "user_missing" };
        }

        var syncKey = SYNC_PREFIX + currentUser.id;
        if (global.localStorage.getItem(syncKey) === "done") {
            return { synced: false, reason: "already_synced" };
        }

        var legacyDb = readLegacyDatabase();
        if (!legacyDb) {
            global.localStorage.setItem(syncKey, "done");
            return { synced: false, reason: "no_local_db" };
        }

        var store = global.createEmeraldFirestoreStore(global.EmeraldFirebase.firestore);
        await store.upsertUser({
            id: currentUser.id,
            name: currentUser.name,
            email: currentUser.email || global.EmeraldFirebase.buildEmailFromName(currentUser.name),
            lastSeenAt: new Date().toISOString()
        });

        var sectionResults = legacyDb.sectionResults.filter(function (result) {
            return matchesCurrentUser(result, currentUser);
        });
        var fullMockResults = legacyDb.fullMockResults.filter(function (result) {
            return matchesCurrentUser(result, currentUser);
        });
        var practiceEvents = legacyDb.practiceEvents.filter(function (event) {
            return matchesCurrentUser(event, currentUser);
        });

        await Promise.all(sectionResults.map(function (result) {
            return store.addSectionResult(withCurrentUser(result, currentUser));
        }));

        await Promise.all(fullMockResults.map(function (result) {
            return store.addFullMockResult(withCurrentUser(result, currentUser));
        }));

        await Promise.all(practiceEvents.map(function (event) {
            return store.addPracticeEvent(withCurrentUser(event, currentUser));
        }));

        global.localStorage.setItem(syncKey, "done");
        return {
            synced: true,
            sectionResults: sectionResults.length,
            fullMockResults: fullMockResults.length,
            practiceEvents: practiceEvents.length
        };
    }

    var readyPromise = connectTrackerToFirestore().catch(function (error) {
        console.error("Could not connect EmeraldTracker to Firestore:", error);
        return false;
    });

    global.EmeraldFirebaseBridge = {
        ready: function () {
            return readyPromise;
        },
        connectTrackerToFirestore: connectTrackerToFirestore,
        syncLocalResultsForCurrentUser: syncLocalResultsForCurrentUser
    };
})(window);
