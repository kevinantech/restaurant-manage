export interface ResponseBody<T = never> {
  status: 'success' | 'error';
  message?: string;
  data?: T;
}

export class ResponseBodyFactory {
  static success<T = never>({
    data,
    message,
  }: Pick<ResponseBody<T>, 'message' | 'data'>): ResponseBody<T> {
    return {
      status: 'success',
      data,
      message,
    };
  }
  static error(message?: string): ResponseBody {
    return { status: 'error', message };
  }
}
