const SHEET_NAME = "Full Mock Results";
const API_KEY = "emerald2026";

function doGet() {
  return jsonResponse({ ok: true, message: "Emerald full mock webhook is running." });
}

function doPost(e) {
  try {
    const raw = readRequestBody(e);
    const data = JSON.parse(raw || "{}");

    if (API_KEY && data.apiKey !== API_KEY) {
      return jsonResponse({ ok: false, error: "Unauthorized" });
    }

    if (data.type !== "full_mock_result") {
      return jsonResponse({ ok: false, error: "Invalid request type" });
    }

    const sheet = getOrCreateSheet();
    ensureHeaders(sheet);

    sheet.appendRow([
      data.date || new Date().toISOString(),
      data.userName || "",
      data.testId || "",
      data.listeningBand ?? "",
      data.readingBand ?? "",
      data.writingBand ?? "",
      data.overallBand ?? "",
      data.listeningScore ?? "",
      data.readingScore ?? ""
    ]);

    return jsonResponse({ ok: true });
  } catch (error) {
    return jsonResponse({ ok: false, error: String(error) });
  }
}

function readRequestBody(e) {
  if (e && e.postData && e.postData.contents) {
    return e.postData.contents;
  }

  if (e && e.parameter && e.parameter.payload) {
    return e.parameter.payload;
  }

  return "{}";
}

function getOrCreateSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  return sheet;
}

function ensureHeaders(sheet) {
  if (sheet.getLastRow() > 0) {
    return;
  }

  const headers = [
    "Date",
    "Username",
    "Test ID",
    "Listening Band",
    "Reading Band",
    "Writing Band",
    "Overall Band",
    "Listening Score (/40)",
    "Reading Score (/40)"
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
  sheet.setFrozenRows(1);
}

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
