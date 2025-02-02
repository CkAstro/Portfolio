import express from 'express';
import { getImageFromUri } from './images';

export const apiRouter = express.Router();

apiRouter.get('/img/:imageUri', getImageFromUri);
