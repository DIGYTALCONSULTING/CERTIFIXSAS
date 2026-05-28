const SHEET_NAME = 'Resenas'
const SPREADSHEET_ID_PROPERTY = 'CERTIFIX_REVIEWS_SPREADSHEET_ID'

function doGet() {
  const sheet = getReviewsSheet()
  const rows = sheet.getDataRange().getValues()
  const reviews = rows.slice(1).map(rowToReview).filter(Boolean).reverse()

  return jsonResponse({
    ok: true,
    reviews,
  })
}

function doPost(event) {
  try {
    const payload = JSON.parse(event.postData.contents || '{}')
    const station = sanitizeText(payload.station, 'EDS Certifix', 80)
    const rating = Math.min(Math.max(Number(payload.rating) || 0, 1), 5)
    const text = sanitizeText(payload.text, '', 200)
    const displayDate = sanitizeText(payload.date, formatDate(new Date()), 40)

    if (!rating) {
      return jsonResponse({
        ok: false,
        error: 'La calificacion es obligatoria.',
      })
    }

    const sheet = getReviewsSheet()
    const id = String(Date.now())

    sheet.appendRow([
      id,
      new Date(),
      station,
      rating,
      text,
      displayDate,
    ])

    return jsonResponse({
      ok: true,
      review: {
        id,
        station,
        rating,
        text,
        date: displayDate,
      },
    })
  } catch (error) {
    return jsonResponse({
      ok: false,
      error: error.message,
    })
  }
}

function getReviewsSheet() {
  const spreadsheetId = PropertiesService.getScriptProperties().getProperty(SPREADSHEET_ID_PROPERTY)

  if (!spreadsheetId) {
    throw new Error('Falta configurar la propiedad CERTIFIX_REVIEWS_SPREADSHEET_ID.')
  }

  const spreadsheet = SpreadsheetApp.openById(spreadsheetId)
  let sheet = spreadsheet.getSheetByName(SHEET_NAME)

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME)
  }

  ensureHeaders(sheet)
  return sheet
}

function ensureHeaders(sheet) {
  const headers = ['id', 'timestamp', 'station', 'rating', 'text', 'date']
  const currentHeaders = sheet.getRange(1, 1, 1, headers.length).getValues()[0]
  const hasHeaders = headers.every((header, index) => currentHeaders[index] === header)

  if (!hasHeaders) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers])
    sheet.setFrozenRows(1)
  }
}

function rowToReview(row) {
  const rating = Number(row[3])

  if (!row[0] || !rating) return null

  return {
    id: String(row[0]),
    station: String(row[2] || 'EDS Certifix'),
    rating,
    text: String(row[4] || ''),
    date: String(row[5] || ''),
  }
}

function sanitizeText(value, fallback, maxLength) {
  const text = String(value || fallback).trim()
  return text.slice(0, maxLength)
}

function formatDate(date) {
  return Utilities.formatDate(date, 'America/Bogota', 'dd MMM yyyy')
}

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON)
}
