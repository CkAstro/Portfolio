import { logger } from '@/utils';
import type express from 'express';

// block access to API calls
const pathPrefixes = [
   '.', // .env, etc
   'ven',
   'php',
   'lib',
   'ws',
   'admin',
   'back',
   'pan',
   'V2',
   'con',
   'wp',
   'sto',
].map((prefix) => ['/', prefix].join(''));
const terms = ['env', 'config', 'git', 'php'];

const isBlacklisted = (path: string): boolean =>
   pathPrefixes.some((prefix) => path.startsWith(prefix)) ||
   terms.some((term) => path.includes(term));

export const apiBlacklist = (
   request: express.Request,
   response: express.Response,
   next: express.NextFunction
): void => {
   if (isBlacklisted(request.path)) {
      logger(`blocked blacklisted request: ${request.path} (${request.method})`);
      response.status(405).json({ error: 'nope' });
   } else next();
};
