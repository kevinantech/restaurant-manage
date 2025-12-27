import { NextResponse } from 'next/server';
import { RouteError } from '../errors/route.error';
import { COMMON_MESSAGE, HTTP_STATUS } from '../http/http-status';
import { ResponseBodyFactory } from '../http/response-body.factory';

interface IErrorHandler {
  handle(error: unknown): any;
}

/**
 * For server actions
 */
export class ActionErrorHandler implements IErrorHandler {
  constructor(private readonly error: unknown) {}
  handle() {
    if (this.error instanceof RouteError) {
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
    if (this.error instanceof RouteError) {
      return NextResponse.json(
        { ...ResponseBodyFactory.error(this.error.message) },
        { status: this.error.status }
      );
    }

    return NextResponse.json(
      { ...ResponseBodyFactory.error(COMMON_MESSAGE.INTERNAL_SERVER_ERROR) },
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR }
    );
  }
}
