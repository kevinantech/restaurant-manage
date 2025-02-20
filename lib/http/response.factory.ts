import { NextResponse } from 'next/server';
import { ResponseBody, ResponseBodyFactory } from './response-body.factory';
import { HTTP_STATUS } from './http-status';

export const COMMON_MESSAGE = {
  INTERNAL_SERVER_ERROR: '¡Ups! Algo salió mal',
};

export interface IResponseFactory<T = never> {
  Ok(): NextResponse<ResponseBody<T>>;
  InternalServerError(): NextResponse<ResponseBody>;
}

export class ResponseFactory<T = never> implements IResponseFactory<T> {
  private readonly body?: ResponseBody<T>;

  constructor(body?: ResponseBody<T>) {
    this.body = body;
  }

  Ok(): NextResponse<ResponseBody<T>> {
    if (!this.body) throw new Error('Body is required for this response');
    return NextResponse.json({
      ...this.body,
    });
  }

  InternalServerError(): NextResponse<ResponseBody> {
    return NextResponse.json(
      ResponseBodyFactory.error(COMMON_MESSAGE.INTERNAL_SERVER_ERROR),
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR }
    );
  }
}
