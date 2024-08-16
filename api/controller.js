const { getSecretFiles, downloadSecretFile } = require('./service.js')
const { formatFiles } = require('./dataProcessing.js')

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

      if (!data.length) {
        throw new Error('Invalid File')
      }

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
    let concatenatedData = '';
    let headerIncluded = false;

    for (const filename of files) {
      const response = await downloadSecretFile(filename)

      const lines = response.split('\n');
      if (headerIncluded) {
        concatenatedData += lines.slice(1).join('\n') + '\n';
      } else {
        concatenatedData += response + '\n';
        headerIncluded = true;
      }
    }
    res.header('Content-Type', 'text/csv');
    return res.send(concatenatedData)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, message: 'Internal server error' })
  }
}

module.exports = { secretFiles, unFormattedSecretFiles }
