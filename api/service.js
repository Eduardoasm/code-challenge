const fetch = require('node-fetch')

/**
 * @function getSecretFiles
 * @async
 * @description Fetches a list of secret files from the external API. It sends a GET request with appropriate headers and processes the response to return the data in JSON format.
 * @returns {Promise<Object>} A promise that resolves to an object containing the list of secret files.
 * @throws {Error} log an error if the fetch operation fails or if there is an issue parsing the response.
 */
async function getSecretFiles () {
  try {
    const options = {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer aSuperSecretKey'
      }
    }

    const response = await fetch('https://echo-serv.tbxnet.com/v1/secret/files', options)
    /** pendiente aqui */
    const textResponse = await response.text()
    const data = JSON.parse(textResponse)
    return data
  } catch (error) {
    console.log('error', error)
  }
}

/**
 * @function downloadSecretFile
 * @async
 * @description Downloads a specific secret file from the external API based on the provided file identifier.
 * @param {string} file - The identifier of the secret file to download.
 * @returns {Promise<string>} A promise that resolves to the file content as a string.
 * @throws {Error} logs an error if the fetch operation fails or if the response status is not 200.
 */
async function downloadSecretFile (file) {
  try {
    const options = {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer aSuperSecretKey'
      }
    }

    const response = await fetch(`https://echo-serv.tbxnet.com/v1/secret/file/${file}`, options)

    if (response.status !== 200) {
      console.log('error')
    }

    return response.text()
  } catch (error) {
    console.log('error', error)
  }
}

module.exports = { getSecretFiles, downloadSecretFile }
