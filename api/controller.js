const { formatFiles, getSecretFiles } = require("./service.js");

async function secretFiles(req, res) {
  try {
    const { files } = await getSecretFiles();

    const format = await formatFiles(files);
  
    return res.status(200).json({ success: true, data: format})
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: 'Internal server error' })
  }
}

module.exports = { secretFiles };