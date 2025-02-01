import compression from 'compression';
import cors from 'cors';
import express from 'express';
import { PORT } from '@/config';
import { apiBlacklist, requestLogger, unknownEndpoint } from '@/middleware';
import { apiRouter } from '@/routes';

// ----- init ----- //
const app = express();
app.use(compression());
app.use(cors());
app.use(express.json());

// ----- blacklist ----- //
app.use(apiBlacklist);

// ----- log ----- //
app.use(requestLogger);

// ----- RESTful ----- //
app.use('/api', apiRouter);

// ----- static serving ----- //
app.use(express.static('../../client/dist')); // NOTE: this MUST come after API requests

// ----- unknown endpoint ----- //
app.use(unknownEndpoint);

// ----- init and listen ----- //
app.listen(PORT, () => console.log(`Web server running on port ${PORT}`));
