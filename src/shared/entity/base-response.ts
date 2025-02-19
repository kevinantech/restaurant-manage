import { NextResponse } from 'next/server';
import { ResponseCodeType } from '../_common/constants/response-codes';

export interface IBaseResponse<T = never> {
  code: ResponseCodeType;
  status: number;
  message: string;
  data?: T;
}

export interface ClientResponse<T = never> {
  data?: T;
  error?: Error;
  messsage: string;
}

export const Response = <T>(base: IBaseResponse<T>) =>
  NextResponse.json(
    { data: base.data, message: base.message },
    { status: base.status }
  );
