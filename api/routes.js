const express = require('express');
const { secretFiles } = require('./controller.js');

const Router = express.Router;

const fileRouter = Router();

fileRouter.get('/data', secretFiles)

module.exports = fileRouter;