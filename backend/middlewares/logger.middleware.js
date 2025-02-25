import * as winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

import Constants from "../constants.js";

const transport1 = new DailyRotateFile({
  filename : "%DATE%.error.log",
  datePattern: "YYYY-MM-DD-HH",
  zippedArchive: true,
  maxSize: "10m",
  maxFiles: "14d",
  dirname: "logs/errors",
});

const transport2 = new DailyRotateFile({
  filename: "%DATE%.combined.log",
  datePattern: "YYYY-MM-DD-HH",
  zippedArchive: true,
  maxSize: "10m",
  maxFiles: "14d",
  dirname: "logs/combined"
})

const transport3 = new DailyRotateFile({
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple()
  ),
  dirname: "logs/debug",
});

export const logger = winston.createLogger({
  level: Constants.ENV == "production" ? "info" : "debug",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  defaultMeta: { service: 'blog-api' },
  transports: [transport1, transport2],
});

if (Constants.ENV == "development") {
  logger.add(transport3);
}

export const requestLogger = (req, _res, next) => {
  logger.info(`${req.method} ${req.url}`, {
    headers: req.headers,
    query: req.query,
    body: req.body,
  });
  next();
}

export const requestRecievedLogger = (req, res, next) => {
  console.log(`Recieved ${req.method} request to ${req.path}`);
  next();
}