const SHEET_NAME = 'Hoja 1'
const SPREADSHEET_ID_PROPERTY = 'CERTIFIX_CERTIFICATES_SPREADSHEET_ID'
const ROOT_FOLDER_ID_PROPERTY = 'CERTIFIX_CERTIFICATES_ROOT_FOLDER_ID'
const HEADERS = ['numero_certificado', 'estacion', 'certificado_url', 'informe_url', 'estado']

function syncCertificatesFromDrive() {
  const sheet = getCertificatesSheet()
  const rootFolderId = PropertiesService.getScriptProperties().getProperty(ROOT_FOLDER_ID_PROPERTY)

  if (!rootFolderId) {
    throw new Error('Falta configurar la propiedad CERTIFIX_CERTIFICATES_ROOT_FOLDER_ID.')
  }

  ensureHeaders(sheet)

  const rootFolder = DriveApp.getFolderById(rootFolderId)
  const groupedFiles = {}

  scanFolder(rootFolder, groupedFiles)

  const rows = Object.keys(groupedFiles)
    .sort()
    .map((certificateNumber) => {
      const item = groupedFiles[certificateNumber]

      return [
        certificateNumber,
        item.station || '',
        item.certificateUrl || '',
        item.reportUrl || '',
        item.status || 'Vigente',
      ]
    })

  sheet.getRange(2, 1, Math.max(sheet.getLastRow() - 1, 1), HEADERS.length).clearContent()

  if (rows.length) {
    sheet.getRange(2, 1, rows.length, HEADERS.length).setValues(rows)
  }

  return {
    ok: true,
    total: rows.length,
  }
}

function scanFolder(folder, groupedFiles) {
  const files = folder.getFilesByType(MimeType.PDF)

  while (files.hasNext()) {
    const file = files.next()
    const parsedFile = parseCertificateFile(file)

    if (!parsedFile) continue

    if (!groupedFiles[parsedFile.certificateNumber]) {
      groupedFiles[parsedFile.certificateNumber] = {
        station: parsedFile.station,
        certificateUrl: '',
        reportUrl: '',
        status: 'Vigente',
      }
    }

    if (parsedFile.type === 'certificate') {
      groupedFiles[parsedFile.certificateNumber].certificateUrl = parsedFile.url
    }

    if (parsedFile.type === 'report') {
      groupedFiles[parsedFile.certificateNumber].reportUrl = parsedFile.url
    }

    if (!groupedFiles[parsedFile.certificateNumber].station && parsedFile.station) {
      groupedFiles[parsedFile.certificateNumber].station = parsedFile.station
    }
  }

  const folders = folder.getFolders()

  while (folders.hasNext()) {
    scanFolder(folders.next(), groupedFiles)
  }
}

function parseCertificateFile(file) {
  const fileName = file.getName()
  const certificateMatch = fileName.match(/\b\d{1,6}-20\d{2}\b/i)

  if (!certificateMatch) return null

  const certificateNumber = certificateMatch[0].toUpperCase()
  const normalizedName = normalizeText(fileName)
  const type = normalizedName.includes('informe') ? 'report' : normalizedName.includes('certificado') ? 'certificate' : ''

  if (!type) return null

  return {
    certificateNumber,
    type,
    station: getStationName(fileName, certificateNumber),
    url: `https://drive.google.com/file/d/${file.getId()}/view?usp=drive_link`,
  }
}

function getStationName(fileName, certificateNumber) {
  return fileName
    .replace(/\.pdf$/i, '')
    .replace(certificateNumber, '')
    .replace(/certificado de inspeccion/ig, '')
    .replace(/informe de inspeccion/ig, '')
    .replace(/certificado/ig, '')
    .replace(/informe/ig, '')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toUpperCase()
}

function getCertificatesSheet() {
  const spreadsheetId = PropertiesService.getScriptProperties().getProperty(SPREADSHEET_ID_PROPERTY)

  if (!spreadsheetId) {
    throw new Error('Falta configurar la propiedad CERTIFIX_CERTIFICATES_SPREADSHEET_ID.')
  }

  const spreadsheet = SpreadsheetApp.openById(spreadsheetId)
  return spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.getSheets()[0]
}

function ensureHeaders(sheet) {
  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS])
  sheet.setFrozenRows(1)
}

function normalizeText(value) {
  return String(value)
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
}
