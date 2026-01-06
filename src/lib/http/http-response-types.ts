export interface ApiResponseSucess<T> {
  data: T;
  code: 'success';
  status: number;
  message: string;
}

export interface ApiResponseError {
  code: 'error';
  status: number;
  message: string;
}
