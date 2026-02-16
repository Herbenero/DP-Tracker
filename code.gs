function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('Hellcastle Defensive Points');
}

function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const player = String(data.player || '').trim();
  const points = Number(data.points || 0);
  const month = String(data.month || '').trim(); // e.g. "February"
  const day = String(data.day || '').trim();     // e.g. "16"

  if (!player || !points || !month || !day) {
    return ContentService.createTextOutput(
      JSON.stringify({ error: 'Missing required fields' })
    ).setMimeType(ContentService.MimeType.JSON);
  }

  const ss = SpreadsheetApp.getActive();
  const sheet = ss.getSheetByName(month);
  if (!sheet) {
    return ContentService.createTextOutput(
      JSON.stringify({ error: 'Month tab not found: ' + month })
    ).setMimeType(ContentService.MimeType.JSON);
  }

  // Header row (assume row 1)
  const lastCol = sheet.getLastColumn() || 2;
  const headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];

  // Find the column for the day (headers like "1", "2", ..., "31")
  const dayColIndex = headers.indexOf(day);
  if (dayColIndex === -1) {
    return ContentService.createTextOutput(
      JSON.stringify({ error: 'Day column not found: ' + day })
    ).setMimeType(ContentService.MimeType.JSON);
  }
  const dayCol = dayColIndex + 1;

  // Get all player names in column A (starting row 2)
  const lastRow = sheet.getLastRow();
  let row = -1;

  if (lastRow >= 2) {
    const namesRange = sheet.getRange(2, 1, lastRow - 1, 1);
    const names = namesRange.getValues().map(r => String(r[0] || '').trim());

    const idx = names.indexOf(player);
    if (idx !== -1) {
      row = idx + 2; // offset because names start at row 2
    }
  }

  // If player not found → create new row
  if (row === -1) {
    row = lastRow + 1;
    sheet.getRange(row, 1).setValue(player);
  }

  // Add points to the correct day cell
  const cell = sheet.getRange(row, dayCol);
  const currentValue = Number(cell.getValue() || 0);
  cell.setValue(currentValue + points);

  return ContentService.createTextOutput(
    JSON.stringify({ success: true })
  ).setMimeType(ContentService.MimeType.JSON);
}
