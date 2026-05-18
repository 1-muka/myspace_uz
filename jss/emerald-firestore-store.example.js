(function (global) {
    "use strict";

    if (global.createEmeraldFirestoreStore) {
        return;
    }

    function snapshotToArray(snapshot) {
        return snapshot.docs.map(function (doc) {
            return doc.data();
        });
    }

    function createEmeraldFirestoreStore(firestore) {
        if (!firestore || typeof firestore.collection !== "function") {
            throw new Error("Pass firebase.firestore() into createEmeraldFirestoreStore(...).");
        }

        return {
            kind: "firestore",

            async upsertUser(user) {
                await firestore.collection("users").doc(user.id).set(user, { merge: true });
                return user;
            },

            async getUser(userId) {
                var doc = await firestore.collection("users").doc(userId).get();
                return doc.exists ? doc.data() : null;
            },

            async getAllUsers() {
                var snapshot = await firestore.collection("users").get();
                return snapshotToArray(snapshot);
            },

            async addSectionResult(result) {
                await firestore.collection("sectionResults").doc(result.id).set(result);
                return result;
            },

            async getSectionResults(userId) {
                var snapshot = await firestore
                    .collection("sectionResults")
                    .where("userId", "==", userId)
                    .get();
                return snapshotToArray(snapshot);
            },

            async getAllSectionResults() {
                var snapshot = await firestore.collection("sectionResults").get();
                return snapshotToArray(snapshot);
            },

            async addFullMockResult(result) {
                await firestore.collection("fullMockResults").doc(result.id).set(result);
                return result;
            },

            async getFullMockResults(userId) {
                var snapshot = await firestore
                    .collection("fullMockResults")
                    .where("userId", "==", userId)
                    .get();
                return snapshotToArray(snapshot);
            },

            async getAllFullMockResults() {
                var snapshot = await firestore.collection("fullMockResults").get();
                return snapshotToArray(snapshot);
            },

            async addPracticeEvent(event) {
                await firestore.collection("practiceEvents").doc(event.id).set(event);
                return event;
            },

            async getPracticeEvents(userId) {
                var snapshot = await firestore
                    .collection("practiceEvents")
                    .where("userId", "==", userId)
                    .get();
                return snapshotToArray(snapshot);
            }
        };
    }

    global.createEmeraldFirestoreStore = createEmeraldFirestoreStore;
})(window);
