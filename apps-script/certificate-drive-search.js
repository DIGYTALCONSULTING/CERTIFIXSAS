const CERTIFICATES_FOLDER_ID = '1oiFLPnQhdudY3UzS1Bf4vi3fk3kcQc_A'
const MAX_RESULTS = 10
const MIN_SCORE = 25

function doGet(e) {
  const query = normalizeText(e.parameter.q || e.parameter.cert || '')

  if (!query) {
    return jsonResponse({
      ok: false,
      message: 'Debes ingresar el nombre de la empresa o del certificado.'
    })
  }

  const folder = DriveApp.getFolderById(CERTIFICATES_FOLDER_ID)
  const files = folder.getFilesByType(MimeType.PDF)
  const results = []

  while (files.hasNext()) {
    const file = files.next()
    const fileName = file.getName()
    const searchableName = normalizeText(fileName.replace(/\.pdf$/i, ''))
    const score = getMatchScore(query, searchableName)

    if (score >= MIN_SCORE) {
      const fileId = file.getId()

      results.push({
        file_id: fileId,
        file_name: fileName,
        score,
        download_url: `https://drive.google.com/uc?export=download&id=${fileId}`,
        view_url: `https://drive.google.com/file/d/${fileId}/view`
      })
    }
  }

  if (!results.length) {
    return jsonResponse({
      ok: false,
      message: 'No encontramos certificados con ese nombre.'
    })
  }

  return jsonResponse({
    ok: true,
    total: results.length,
    results: results
      .sort((a, b) => b.score - a.score || a.file_name.localeCompare(b.file_name))
      .slice(0, MAX_RESULTS)
  })
}

function getMatchScore(query, fileName) {
  if (fileName === query) return 100
  if (fileName.includes(query)) return 90
  if (query.includes(fileName)) return 85

  const queryWords = uniqueWords(query)
  const fileWords = uniqueWords(fileName)

  if (!queryWords.length || !fileWords.length) return 0

  let exactWordMatches = 0
  let partialWordMatches = 0

  queryWords.forEach(queryWord => {
    if (fileWords.includes(queryWord)) {
      exactWordMatches += 1
      return
    }

    if (fileWords.some(fileWord => fileWord.includes(queryWord) || queryWord.includes(fileWord))) {
      partialWordMatches += 1
    }
  })

  const wordCoverage = ((exactWordMatches + partialWordMatches * 0.65) / queryWords.length) * 70
  const similarity = getSimilarity(query, fileName) * 30

  return Math.round(wordCoverage + similarity)
}

function uniqueWords(value) {
  return normalizeText(value)
    .split(' ')
    .filter(word => word.length > 1 && !isStopWord(word))
    .filter((word, index, words) => words.indexOf(word) === index)
}

function isStopWord(word) {
  return ['de', 'del', 'la', 'las', 'el', 'los', 'y', 'en', 'para', 'por', 'certificado', 'inspeccion'].includes(word)
}

function getSimilarity(a, b) {
  const distance = levenshteinDistance(a, b)
  const longest = Math.max(a.length, b.length)

  if (!longest) return 1

  return 1 - distance / longest
}

function levenshteinDistance(a, b) {
  const matrix = []

  for (let i = 0; i <= b.length; i += 1) {
    matrix[i] = [i]
  }

  for (let j = 0; j <= a.length; j += 1) {
    matrix[0][j] = j
  }

  for (let i = 1; i <= b.length; i += 1) {
    for (let j = 1; j <= a.length; j += 1) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1]
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        )
      }
    }
  }

  return matrix[b.length][a.length]
}

function normalizeText(value) {
  return String(value)
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
}

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON)
}
