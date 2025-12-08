"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = require("winston");
require("winston-daily-rotate-file");
const { combine, timestamp, printf, colorize, align, json } = winston_1.format;
const consoleFormat = combine(colorize({ all: true }), timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), align(), printf(({ level, message, timestamp, stack }) => {
    return `[${timestamp}] ${level}: ${stack || message}`;
}));
const dailyRotateFileTransport = new winston_1.transports.DailyRotateFile({
    filename: 'logs/app-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: false,
    maxFiles: '2d',
    format: combine(timestamp(), json()),
});
exports.logger = (0, winston_1.createLogger)({
    level: 'info',
    format: combine(timestamp(), json()),
    transports: [
        new winston_1.transports.Console({
            format: consoleFormat,
        }),
        dailyRotateFileTransport,
    ],
});
//# sourceMappingURL=logger.js.map