/**
 * @function isValidHexadecimal32
 * @description Checks if the provided string is a valid hexadecimal of exactly 32 digits.
 * @param {string} hexString - The string to check.
 * @returns {boolean} True if the string is a valid hexadecimal, otherwise false.
 */
function isValidHexadecimal32 (hexString) {
  const hexRegex = /^[0-9A-Fa-f]{32}$/
  return hexRegex.test(hexString)
}

/**
 * @function isValidNumber
 * @description Checks if the provided value is a valid number.
 * @param {*} value - The value to check.
 * @returns {boolean} True if the value is a valid number, otherwise false.
 */
function isValidNumber (value) {
  const number = Number(value)
  return !isNaN(number) && isFinite(number)
}

/**
 * @function isValidCSVFileName
 * @description Checks if the provided file name ends with '.csv'.
 * @param {string} fileName - The file name to check.
 * @returns {boolean} True if the file name ends with '.csv', otherwise false.
 */
function isValidCSVFileName (fileName) {
  return fileName.trim().endsWith('.csv')
}

/**
 * @function isValidText
 * @description Checks if the provided text is non-empty.
 * @param {string} text - The text to check.
 * @returns {boolean} True if the text is non-empty, otherwise false.
 */
function isValidText (text) {
  return text.trim().length > 0
}

module.exports = { isValidCSVFileName, isValidHexadecimal32, isValidNumber, isValidText }
