import express from 'express';
import { getImageFromUri, getTextureFromUri } from './images';

export const apiRouter = express.Router();

apiRouter.get('/img/:imageUri', getImageFromUri);
apiRouter.get('/textures/:dir/:texture', getTextureFromUri);
