import { mkdirSync } from 'node:fs';
import path from 'node:path';
import winston from 'winston';

const LOG_DIRECTORY = path.resolve(process.cwd(), 'logs');
mkdirSync(LOG_DIRECTORY, { recursive: true });

const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
  winston.format.printf(({ timestamp, level, message }) => `${timestamp} [${level.toUpperCase()}] ${message}`),
);

/** Shared logger: writes every test action to the console and to logs/test-run.log. */
const logger = winston.createLogger({
  format: logFormat,
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: path.join(LOG_DIRECTORY, 'test-run.log') }),
  ],
});

export default logger;
