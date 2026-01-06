import { HTTP_STATUS } from './http-status';

export class HttpException extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    Object.setPrototypeOf(this, HttpException.prototype);
  }
}

export class BadRequestException extends HttpException {
  constructor(message: string) {
    super(HTTP_STATUS.BAD_REQUEST, message);
  }
}

export class UnauthorizedException extends HttpException {
  constructor(message: string) {
    super(HTTP_STATUS.UNAUTHORIZED, message);
  }
}
export class ForbiddenException extends HttpException {
  constructor(message: string) {
    super(HTTP_STATUS.FORBIDDEN, message);
  }
}

export class NotFoundException extends HttpException {
  constructor(message: string) {
    super(HTTP_STATUS.NOT_FOUND, message);
  }
}

export class ConflictException extends HttpException {
  constructor(message: string) {
    super(HTTP_STATUS.CONFLICT, message);
  }
}

export class InternalServerErrorException extends HttpException {
  constructor(message: string) {
    super(HTTP_STATUS.INTERNAL_SERVER_ERROR, message);
  }
}
