import { STATUS_CODE } from '../enum/status_code';

export class HttpErrorException extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;

    // biar bisa trace class ini
    Object.setPrototypeOf(this, HttpErrorException.prototype);
  }
}

// Bad Request Exception
export class BadRequestException extends HttpErrorException {
  constructor(message = 'Bad Request') {
    super(STATUS_CODE.BAD_REQUEST, message);
    Object.setPrototypeOf(this, BadRequestException.prototype);
  }
}
// Unauthorized Exception
export class UnauthorizedException extends HttpErrorException {
  constructor(message = 'Unauthorized access') {
    super(STATUS_CODE.UNAUTHORIZED, message);
    Object.setPrototypeOf(this, UnauthorizedException.prototype);
  }
}

// Forbidden Exception
export class ForbiddenException extends HttpErrorException {
  constructor(message = 'Forbidden access') {
    super(STATUS_CODE.FORBIDDEN, message);
    Object.setPrototypeOf(this, ForbiddenException.prototype);
  }
}

// Not Found Exception
export class NotFoundException extends HttpErrorException {
  constructor(message = 'Resource not found') {
    super(STATUS_CODE.NOT_FOUND, message);
    Object.setPrototypeOf(this, NotFoundException.prototype);
  }
}

// Internal Server Error Exception
export class InternalServerErrorException extends HttpErrorException {
  constructor(message = 'Internal Server Error') {
    super(STATUS_CODE.INTERNAL_SERVER_ERROR, message);
    Object.setPrototypeOf(this, InternalServerErrorException.prototype);
  }
}
