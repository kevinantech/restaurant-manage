export interface IResponseBase<T = any> {
  code: string;
  data?: T;
  message: string | string[];
  status: number;
}

export class ResponseModel extends Response {
  constructor(responseBase: IResponseBase) {
    super(JSON.stringify(responseBase), { status: responseBase.status });
  }
}
