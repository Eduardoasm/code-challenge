const express = require('express')
const { secretFiles, unFormattedSecretFiles } = require('./controller.js')

const Router = express.Router

const fileRouter = Router()

fileRouter.get('/data', secretFiles)
fileRouter.get('/list', unFormattedSecretFiles)

module.exports = fileRouter
