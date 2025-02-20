import { ConflictError } from 'lib/errors/conflict.error';
import { ForbiddenError } from 'lib/errors/forbidden.error';
import { NotFoundError } from 'lib/errors/not-found.error';
import { ValidationError } from 'lib/errors/validation.error';
import { COMMON_MESSAGE, ResponseFactory } from 'lib/http/response.factory';
import { ResponseBodyFactory } from '../http/response-body.factory';
import { AuthenticationError } from 'lib/errors/authentication.error';

interface IErrorHandler {
  handle(error: unknown): any;
}

/**
 * For server actions
 */
export class ActionErrorHandler implements IErrorHandler {
  constructor(private readonly error: unknown) {}
  handle() {
    if (
      this.error instanceof ValidationError ||
      this.error instanceof ConflictError ||
      this.error instanceof NotFoundError ||
      this.error instanceof ForbiddenError ||
      this.error instanceof AuthenticationError // If it's a custom error, it's already handled in the response factory
    ) {
      return ResponseBodyFactory.error(this.error.message);
    }

    return ResponseBodyFactory.error(COMMON_MESSAGE.INTERNAL_SERVER_ERROR);
  }
}

/**
 * For routes
 */
export class RouteErrorHandler implements IErrorHandler {
  constructor(private readonly error: unknown) {}
  handle() {
    return new ResponseFactory().InternalServerError();
  }
}
