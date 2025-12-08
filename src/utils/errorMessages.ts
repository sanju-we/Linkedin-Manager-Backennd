import { logger } from "./logger";

export function throwError(message: string, statusCode = 400): never {
  logger.error('Throwing error:', message);
  const error = new Error(message) as Error & { statusCode: number };
  error.statusCode = statusCode;
  throw error;
}

export class HttpError extends Error {
  statusCode: number;
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}


export class InvalidEmail extends HttpError {
  constructor() {
    super(400, 'This User is not existing in this application');
  }
}

export class ALREADY_EXISTS extends HttpError {
  constructor() {
    super(400, 'Already exists');
  }
}

export class INVALID_CREDENTIAL extends HttpError {
  constructor() {
    super(400, 'Invalid Password');
  }
}

export class DATA_NOT_FOUND extends HttpError {
  constructor() {
    super(400, 'Data not found');
  }
}

export class USER_NOT_FOUND extends HttpError {
  constructor() {
    super(400, 'User not found');
  }
}

export class BAD_REQUEST extends HttpError {
  constructor(message: string) {
    super(400, message);
  }
}

export class FILE_NOT_FOUND extends HttpError {
  constructor() {
    super(400, 'File not found');
  }
}
