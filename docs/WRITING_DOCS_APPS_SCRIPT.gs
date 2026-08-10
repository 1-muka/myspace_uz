const WRITING_FOLDER_ID = "1E7X1pb4rbvKMP4HkQvo2l36KB0tK3q4C";
const API_KEY = "emerald2026";

function doGet() {
  return jsonResponse({
    success: true,
    message: "Emerald Writing Docs webhook is running."
  });
}

function doPost(e) {
  try {
    const data = JSON.parse(readRequestBody(e) || "{}");

    if (API_KEY && data.apiKey !== API_KEY) {
      return jsonResponse({ success: false, error: "Unauthorized" });
    }

    const username = String(data.username || "").trim();
    const task = String(data.task || "").trim();
    const submittedAt = String(data.submittedAt || new Date().toISOString()).trim();
    const essay = String(data.essay || "");

    if (!username || !task || !submittedAt || !essay.trim()) {
      return jsonResponse({
        success: false,
        error: "Missing required fields: username, task, submittedAt, essay"
      });
    }

    const folder = DriveApp.getFolderById(WRITING_FOLDER_ID);
    const safeTitle = `${username} - ${task} - ${submittedAt}`.replace(/[\\/:*?"<>|]/g, "-");
    const doc = DocumentApp.create(safeTitle);
    const body = doc.getBody();

    body.clear();

    body.appendParagraph("Student Username:").setBold(true);
    body.appendParagraph(username).setBold(false);

    body.appendParagraph("");
    body.appendParagraph("Task:").setBold(true);
    body.appendParagraph(task).setBold(false);

    body.appendParagraph("");
    body.appendParagraph("Submission Time:").setBold(true);
    body.appendParagraph(submittedAt).setBold(false);

    body.appendParagraph("");
    body.appendParagraph("--------------------------------");

    body.appendParagraph("");
    body.appendParagraph("Student Answer:").setBold(true);
    body.appendParagraph(essay).setBold(false);

    body.appendParagraph("");
    body.appendParagraph("--------------------------------");

    body.appendParagraph("");
    body.appendParagraph("Teacher Assessment:").setBold(true);
    body.appendParagraph("");
    body.appendParagraph("Status:");
    body.appendParagraph("Waiting for teacher");
    body.appendParagraph("");
    body.appendParagraph("Score:");
    body.appendParagraph("");
    body.appendParagraph("Teacher Feedback:");
    body.appendParagraph("");

    doc.saveAndClose();

    const file = DriveApp.getFileById(doc.getId());
    folder.addFile(file);
    DriveApp.getRootFolder().removeFile(file);

    return jsonResponse({
      success: true,
      documentId: doc.getId(),
      documentUrl: doc.getUrl()
    });
  } catch (error) {
    return jsonResponse({
      success: false,
      error: String(error && error.message ? error.message : error)
    });
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

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
