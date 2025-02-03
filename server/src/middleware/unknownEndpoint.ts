import { logger } from '@/utils';
import type express from 'express';

export const unknownEndpoint = (request: express.Request, response: express.Response): void => {
   logger('unknown endpoint:', request.path);
   response.status(404).send({ error: 'unknown endpoint' });
};
