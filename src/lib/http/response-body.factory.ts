import { Pagination } from '@/features/shared/domain/pagination.interface';

export interface ResponseBody<T = never> {
  status: 'success' | 'error';
  message?: string;
  data?: T;
  pagination?: Pagination;
}

export class ResponseBodyFactory {
  static success<T = never>({
    data,
    message,
    pagination,
  }: Pick<
    ResponseBody<T>,
    'message' | 'data' | 'pagination'
  >): ResponseBody<T> {
    return {
      status: 'success',
      message,
      data,
      pagination,
    };
  }
  static error(message?: string): ResponseBody {
    return { status: 'error', message };
  }
}
