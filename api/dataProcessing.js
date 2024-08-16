const { downloadSecretFile } = require('./service.js')
const { isValidCSVFileName, isValidHexadecimal32, isValidNumber, isValidText } = require('./utils.js')

/**
 * @function formatFiles
 * @async
 * @description Formats and processes a list of file names. Downloads each file, converts CSV content to an object, validates the data, and returns the processed data.
 * @param {Array<string>} files - Array of file names to process.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of processed data objects.
 */
async function formatFiles (files) {
  let allData = []
  for (let index = 0; index < files.length; index += 1) {
    const element = await downloadSecretFile(files[index])
    if (!element) {
      console.error(`Error downloading file: ${files[index]}`)
      continue
    }
    const data = csvToObject(element)
    const validate = validateFields(data)
    const dataParse = parseData(validate)
    allData = allData.concat(dataParse)
  }

  return allData
}

/**
 * @function csvToObject
 * @description Converts CSV content to an array of objects.
 * @param {string} csv - The CSV content as a string.
 * @returns {Array<Object>} Array of objects representing the CSV data.
 */
function csvToObject (csv) {
  const lines = csv.split('\n')
  const headers = lines[0].split(',')
  const result = []

  for (let i = 1; i < lines.length; i += 1) {
    const obj = {}
    const currentLine = lines[i].split(',')
    /** Check if the number of fields matches the number of headers
    This ensures that the current line is valid and corresponds correctly to the headers */
    if (currentLine.length === headers.length) {
    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]?.trim()] = currentLine[j]?.trim()
    }
    result.push(obj)
    }
  }

  return result
}

/**
 * @function parseData
 * @description Parses and formats an array of data objects.
 * @param {Array<Object>} files - Array of data objects to parse.
 * @returns {Array<Object>} Array of formatted data objects.
 */
function parseData (files) {
  const data = files.reduce((acc, item) => {
    let existingFile = acc.find(file => file.file === item.file)

    if (!existingFile) {
      existingFile = { file: item.file, lines: [] }
      acc.push(existingFile)
    }

    existingFile.lines.push({
      text: item.text,
      number: parseInt(item.number, 10),
      hex: item.hex
    })

    return acc
  }, [])

  return data
}

/**
 * @function validateFields
 * @description Validates the fields of the data objects.
 * @param {Array<Object>} fields - Array of data objects to validate.
 * @returns {Array<Object>} Array of validated data objects.
 */
function validateFields (fields) {
  return fields.filter((field) => {
    if (!isValidNumber(field?.number)) return false
    if (!isValidCSVFileName(field?.file)) return false
    if (!isValidHexadecimal32(field?.hex)) return false
    if (!isValidText(field?.text)) return false
    return true
  })
}

module.exports = { formatFiles }
