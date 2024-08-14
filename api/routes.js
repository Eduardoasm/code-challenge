import { Router } from 'express';
import { formatFiles } from './controller.js';

const fileRouter = Router();

fileRouter.get('/data', formatFiles)

export default fileRouter;