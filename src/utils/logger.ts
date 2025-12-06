import { createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';

const { combine, timestamp, printf, colorize, align, json } = format;

const consoleFormat = combine(
  colorize({ all: true }),
  timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  align(),
  printf(({ level, message, timestamp, stack }) => {
    return `[${timestamp}] ${level}: ${stack || message}`;
  })
);

const dailyRotateFileTransport = new transports.DailyRotateFile({
  filename: 'logs/app-%DATE%.log', 
  datePattern: 'YYYY-MM-DD',
  zippedArchive: false,
  maxFiles: '2d',
  format: combine(timestamp(), json()),
});

export const logger = createLogger({
  level: 'info',
  format: combine(timestamp(), json()),
  transports: [
    new transports.Console({
      format: consoleFormat,
    }),
    dailyRotateFileTransport,
  ],
});
