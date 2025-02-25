import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';

import connectToDatabase from './database/connectToDatabase.js';
import CONSTANTS from './constants.js';
import { requestLogger } from './helpers/logging.js';
import { protectedRouter, publicRouter } from './routes/routes.js';

// request logger middleware
const requestLoggerMiddleware = (req, _res, next) => {
  requestLogger(req);
  next();
};

connectToDatabase();
const PORT = CONSTANTS.PORT;

const app = express();
const middlewares = [
  cors({credentials: true, origin: CONSTANTS.ORIGIN_URL}),
  express.json({ limit: CONSTANTS.JSON_LIMIT }),
  express.urlencoded({ extended: true }),
  cookieParser(),
  compression(),
  requestLoggerMiddleware,
  publicRouter,
  protectedRouter,
];
app.use(middlewares);

app.listen(PORT, () => {
  const msg = CONSTANTS.ENV === 'production' ? 'in production' : `in development on port: ${PORT}`;
  console.log(`✅ Server is running ${msg}`);
});

// unhandled promise rejections gracefully handled - ideally they should never happen
process.on('unhandledRejection', (reason, promise) => {
  console.log("⚠️ Unhandled Rejection at:\n", promise, "reason:\n", reason);
  process.exit(1);
});