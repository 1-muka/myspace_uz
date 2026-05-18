# Emerald Tracking Layer

No existing files were changed for this scaffold.

New files added:

- `jss/emerald-tracker.js`
- `jss/emerald-firestore-store.example.js`
- `firebase/firestore.rules.example`

## What the tracker already gives you

`emerald-tracker.js` exposes `window.EmeraldTracker` with these ready functions:

- `ensureUser(...)`
- `recordPracticeEvent(...)`
- `recordSectionResult(...)`
- `recordFullMockResult(...)`
- `getRecentResults(...)`
- `getSectionStats(...)`
- `getWeakestStrongestSection(...)`
- `getProgressSeries(...)`
- `getLeaderboard(...)`
- `getUserDashboardStats(...)`
- `exportLocalDatabase()`

By default it stores everything in `localStorage`, so you can test the whole data model before Firebase.

## Data shape used by the tracker

### User

```json
{
  "id": "mukagali",
  "name": "Mukagali",
  "email": "",
  "createdAt": "2026-04-10T10:00:00.000Z",
  "lastSeenAt": "2026-04-10T10:10:00.000Z"
}
```

### Section result

```json
{
  "id": "section_...",
  "userId": "mukagali",
  "userName": "Mukagali",
  "section": "listening",
  "testId": "test1",
  "correctAnswers": 32,
  "totalQuestions": 40,
  "accuracy": 80,
  "band": 7.5,
  "createdAt": "2026-04-10T10:15:00.000Z"
}
```

### Full mock result

```json
{
  "id": "fullmock_...",
  "userId": "mukagali",
  "userName": "Mukagali",
  "testId": "test1",
  "listeningBand": 8,
  "readingBand": 7.5,
  "writingBand": 7,
  "speakingBand": 7.5,
  "overallBand": 7.5,
  "createdAt": "2026-04-10T11:30:00.000Z"
}
```

## Step 1. Load the tracker in pages that need it

Add this script tag after `core.js` and before the page script:

```html
<script src="../jss/emerald-tracker.js"></script>
```

Add it to:

- `index.html` (project root — login page)
- `htmls/dashboard.html`
- `htmls/listening-test1.html`
- `htmls/reading-test1.html`
- `htmls/full-mock.html`

## Step 2. Create the user record when login succeeds

In `jss/auth.js`, after:

```js
App.login(name);
```

add:

```js
await EmeraldTracker.ensureUser({
    name: name
});
```

To support that, make the login handler async:

```js
async function handleLogin() {
```

## Step 3. Save listening results

In `jss/listening-test1.js`, inside `finishTest(message = "Finished")`, after:

```js
const score = grade();
const band = convertToBand(score);
```

add:

```js
EmeraldTracker.recordSectionResult({
    section: "listening",
    testId: "test1",
    correctAnswers: score,
    totalQuestions: 40,
    band: band
}).catch(console.error);
```

## Step 4. Save reading results

In `htmls/reading-test1.html`, inside `finishReading(message = "Finished")`, after:

```js
const score = grade();
const band = getBand(score);
```

add:

```js
EmeraldTracker.recordSectionResult({
    section: "reading",
    testId: "test1",
    correctAnswers: score,
    totalQuestions: 40,
    band: band
}).catch(console.error);
```

## Step 5. Save full mock completion

In `jss/full-mock.js`, inside `finishWholeMock(fromTimer)`, before `showSectionModal(...)`, add:

```js
EmeraldTracker.recordFullMockResult({
    testId: "test1",
    listeningBand: null,
    readingBand: null,
    writingBand: null,
    speakingBand: null,
    overallBand: null,
    meta: {
        listeningAnswered: countAnsweredListeningQuestions(),
        readingAnswered: countAnsweredReadingQuestions(),
        taskOneWords: taskOneWords,
        taskTwoWords: taskTwoWords
    }
}).catch(console.error);
```

Right now your full mock file does not calculate real section bands yet, so the tracker is ready but those values still need to be wired later.

## Step 6. Pull real stats into the dashboard

In `jss/dashboard.js`, after you know the logged-in user, you can load:

```js
EmeraldTracker.getUserDashboardStats().then((stats) => {
    console.log("dashboard stats", stats);
});
```

Useful functions you can use for cards:

```js
await EmeraldTracker.getRecentResults();
await EmeraldTracker.getSectionStats();
await EmeraldTracker.getWeakestStrongestSection();
await EmeraldTracker.getProgressSeries();
await EmeraldTracker.getLeaderboard(10);
await EmeraldTracker.getUserDashboardStats();
```

## Step 7. Switch to Firestore later

After Firebase is initialized in the browser:

```html
<script src="../jss/emerald-tracker.js"></script>
<script src="../jss/emerald-firestore-store.example.js"></script>
```

then connect the tracker:

```js
EmeraldTracker.setStore(
    createEmeraldFirestoreStore(firebase.firestore())
).catch(console.error);
```

That swaps the storage layer from local `localStorage` to Firestore without changing the tracker API.

## Best build order from here

1. Load `emerald-tracker.js` into the needed pages.
2. Wire user creation in `auth.js`.
3. Wire listening result saving.
4. Wire reading result saving.
5. Console-log dashboard stats.
6. Build dashboard cards from tracker data.
7. After local flow works, connect Firestore.

## Fast test

After wiring login + listening + reading:

1. Log in as a user.
2. Finish one listening test.
3. Finish one reading test.
4. Open devtools and run:

```js
EmeraldTracker.exportLocalDatabase()
```

You should see users, results, and events in one object.
