import express from 'express';
import fileRouter from './routes.js';

const app = express();

const PORT = 3000;

app.use(express.json());

app.use('/files', fileRouter);

app.listen(PORT, () => {
    console.log(`servidor corriendo en el puerto = ${PORT}`)
})