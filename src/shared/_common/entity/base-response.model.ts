import { ResponseCodeType } from '../constants/response-codes';

export interface IBaseResponse<T = never> {
  code: ResponseCodeType;
  data?: T;
  message: string | string[];
  status: number;
}

export class ResponseModel extends Response {
  constructor(response: IBaseResponse) {
    super(JSON.stringify(response), { status: response.status });
  }
}
