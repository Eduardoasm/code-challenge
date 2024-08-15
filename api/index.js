const express = require('express');
const fileRouter = require('./routes.js');

const app = express();

const PORT = 3000;

app.use(express.json());

app.use('/files', fileRouter);

app.listen(PORT, () => {
    console.log(`servidor corriendo en el puerto = ${PORT}`)
})

module.exports = app;