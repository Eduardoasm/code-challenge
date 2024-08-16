const { getSecretFiles, downloadSecretFile } = require('./service.js')
const { formatFiles, unformattedFiles } = require('./dataProcessing.js')

/**
 * @function secretFiles
 * @async
 * @description This controller handles the request to fetch and process secret files from an external API.
 * @param {Object} req - The request object from the client.
 * @param {Object} res - The response object to send the data back to the client.
 * @returns {Promise<void>} Returns a JSON response with the formatted data or an error message.
 */
async function secretFiles (req, res) {
  const { fileName } = req.query
  try {
    if (fileName) {

      const data = await formatFiles([fileName])

      return res.status(200).json(data)
    } else {
      const { files } = await getSecretFiles()

      const data = await formatFiles(files)

      return res.status(200).json(data)
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, message: 'Internal server error' })
  }
}

async function unFormattedSecretFiles (req, res) {
  try {
    const { files } = await getSecretFiles()

    const format = await unformattedFiles(files)

    return res.status(200).json({ success: true, data: format })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, message: 'Internal server error' })
  }
}

module.exports = { secretFiles, unFormattedSecretFiles }
