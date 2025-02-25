import Constants from './constants.js';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';

import connectToDatabase from './database/connectToDatabase.js';
import { requestLogger } from './helpers/logging.js';
import { protectedRouter, publicRouter } from './routes/routes.js';

// request logger middleware
const requestLoggerMiddleware = (req, _res, next) => {
  requestLogger(req);
  next();
};

connectToDatabase();
const PORT = Constants.PORT;

const app = express();
const middlewares = [
  cors({credentials: true, origin: Constants.ORIGIN_URL}),
  express.json({ limit: Constants.JSON_LIMIT }),
  express.urlencoded({ extended: true }),
  cookieParser(),
  compression(),
  requestLoggerMiddleware,
  publicRouter,
];
app.use(middlewares);

app.use("/api/auth", protectedRouter);

app.listen(PORT, () => {
  const msg = Constants.ENV === 'production' ? 'in production' : `in development on port: ${PORT}`;
  console.log(`✅ Server is running ${msg}`);
});

// unhandled promise rejections gracefully handled - ideally they should never happen
process.on('unhandledRejection', (reason, promise) => {
  console.log("⚠️ Unhandled Rejection at:\n", promise, "reason:\n", reason);
  process.exit(1);
});