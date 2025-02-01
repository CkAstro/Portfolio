import type express from 'express';

interface ExpressRequest<T> extends express.Request {
   body: T;
}

export const requestLogger = <T>(
   request: ExpressRequest<T>,
   response: express.Response,
   next: express.NextFunction
): void => {
   const { method, path, body } = request;
   const message = { method, path, body };
   console.log('received api call:', message);
   next();
};
