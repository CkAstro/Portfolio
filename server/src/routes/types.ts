import type express from 'express';

export type ExpressCallback<T = unknown> = (
   request: express.Request,
   response: express.Response
) => T;
