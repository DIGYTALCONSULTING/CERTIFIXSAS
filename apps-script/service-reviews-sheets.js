const SHEET_NAME = 'Resenas'
const SPREADSHEET_ID_PROPERTY = 'CERTIFIX_REVIEWS_SPREADSHEET_ID'
const MAX_REVIEWS_RETURNED = 100
const MAX_REVIEWS_PER_HOUR = 30

function doGet() {
  try {
    const sheet = getReviewsSheet()
    const rows = sheet.getDataRange().getValues()
    const reviews = rows.slice(1).map(rowToReview).filter(Boolean).reverse().slice(0, MAX_REVIEWS_RETURNED)

    return jsonResponse({
      ok: true,
      reviews,
    })
  } catch {
    return jsonResponse({
      ok: false,
      reviews: [],
      error: 'No fue posible cargar las resenas.',
    })
  }
}

function doPost(event) {
  const lock = LockService.getScriptLock()

  try {
    lock.waitLock(5000)
    enforceHourlyLimit()

    const payload = JSON.parse(event.postData.contents || '{}')

    if (payload.website) {
      return jsonResponse({
        ok: false,
        error: 'No fue posible guardar la resena.',
      })
    }

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
  } catch {
    return jsonResponse({
      ok: false,
      error: 'No fue posible guardar la resena.',
    })
  } finally {
    try {
      lock.releaseLock()
    } catch {
      // The lock may not have been acquired if Apps Script failed early.
    }
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
  const text = String(value || fallback)
    .replace(/[\u0000-\u001f\u007f]/g, '')
    .trim()
  return text.slice(0, maxLength)
}

function enforceHourlyLimit() {
  const cache = CacheService.getScriptCache()
  const key = `review-limit-${Utilities.formatDate(new Date(), 'America/Bogota', 'yyyyMMddHH')}`
  const currentCount = Number(cache.get(key) || '0')

  if (currentCount >= MAX_REVIEWS_PER_HOUR) {
    throw new Error('Rate limit exceeded')
  }

  cache.put(key, String(currentCount + 1), 3600)
}

function formatDate(date) {
  return Utilities.formatDate(date, 'America/Bogota', 'dd MMM yyyy')
}

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON)
}
