const SHEET_NAME = 'Hoja 1'
const SPREADSHEET_ID_PROPERTY = 'CERTIFIX_CERTIFICATES_SPREADSHEET_ID'
const MAX_QUERY_LENGTH = 40

function doGet(event) {
  try {
    const certificateNumber = normalizeText(event.parameter.certificado || event.parameter.q || '')

    if (!certificateNumber || certificateNumber.length > MAX_QUERY_LENGTH) {
      return jsonResponse({
        ok: false,
        message: 'Debes ingresar el numero del certificado.',
      })
    }

    const sheet = getCertificatesSheet()
    const rows = sheet.getDataRange().getValues()
    const headers = rows[0]
    const certificates = rows.slice(1).map((row) => rowToCertificate(headers, row)).filter(Boolean)

    const result = certificates.find((certificate) => {
      return normalizeText(certificate.numero_certificado) === certificateNumber
    })

    if (!result) {
      return jsonResponse({
        ok: false,
        message: 'No encontramos un certificado con ese numero.',
      })
    }

    if (normalizeText(result.estado) !== 'vigente') {
      return jsonResponse({
        ok: false,
        message: 'El certificado existe, pero no se encuentra vigente para consulta publica.',
      })
    }

    return jsonResponse({
      ok: true,
      certificate: result,
    })
  } catch {
    return jsonResponse({
      ok: false,
      message: 'No fue posible consultar el certificado en este momento.',
    })
  }
}

function getCertificatesSheet() {
  const spreadsheetId = PropertiesService.getScriptProperties().getProperty(SPREADSHEET_ID_PROPERTY)

  if (!spreadsheetId) {
    throw new Error('Missing spreadsheet id')
  }

  const spreadsheet = SpreadsheetApp.openById(spreadsheetId)
  return spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.getSheets()[0]
}

function rowToCertificate(headers, row) {
  const data = {}

  headers.forEach((header, index) => {
    data[String(header).trim()] = row[index]
  })

  if (!data.numero_certificado) return null

  return {
    numero_certificado: sanitizeText(data.numero_certificado, 40),
    estacion: sanitizeText(data.estacion, 100),
    certificado_url: sanitizeUrl(data.certificado_url),
    informe_url: sanitizeUrl(data.informe_url),
    estado: sanitizeText(data.estado, 40),
  }
}

function sanitizeText(value, maxLength) {
  return String(value || '')
    .replace(/[\u0000-\u001f\u007f]/g, '')
    .trim()
    .slice(0, maxLength)
}

function sanitizeUrl(value) {
  const url = sanitizeText(value, 500)

  if (!url) return ''
  if (!/^https:\/\/drive\.google\.com\/file\/d\/[^/]+\/view/i.test(url)) return ''

  return url
}

function normalizeText(value) {
  return String(value)
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '')
}

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON)
}
