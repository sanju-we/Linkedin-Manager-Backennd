"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FILE_NOT_FOUND = exports.BAD_REQUEST = exports.USER_NOT_FOUND = exports.DATA_NOT_FOUND = exports.INVALID_CREDENTIAL = exports.ALREADY_EXISTS = exports.InvalidEmail = exports.HttpError = void 0;
exports.throwError = throwError;
const logger_1 = require("./logger");
function throwError(message, statusCode = 400) {
    logger_1.logger.error('Throwing error:', message);
    const error = new Error(message);
    error.statusCode = statusCode;
    throw error;
}
class HttpError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.HttpError = HttpError;
class InvalidEmail extends HttpError {
    constructor() {
        super(400, 'This User is not existing in this application');
    }
}
exports.InvalidEmail = InvalidEmail;
class ALREADY_EXISTS extends HttpError {
    constructor() {
        super(400, 'Already exists');
    }
}
exports.ALREADY_EXISTS = ALREADY_EXISTS;
class INVALID_CREDENTIAL extends HttpError {
    constructor() {
        super(400, 'Invalid Password');
    }
}
exports.INVALID_CREDENTIAL = INVALID_CREDENTIAL;
class DATA_NOT_FOUND extends HttpError {
    constructor() {
        super(400, 'Data not found');
    }
}
exports.DATA_NOT_FOUND = DATA_NOT_FOUND;
class USER_NOT_FOUND extends HttpError {
    constructor() {
        super(400, 'User not found');
    }
}
exports.USER_NOT_FOUND = USER_NOT_FOUND;
class BAD_REQUEST extends HttpError {
    constructor(message) {
        super(400, message);
    }
}
exports.BAD_REQUEST = BAD_REQUEST;
class FILE_NOT_FOUND extends HttpError {
    constructor() {
        super(400, 'File not found');
    }
}
exports.FILE_NOT_FOUND = FILE_NOT_FOUND;
//# sourceMappingURL=errorMessages.js.map