import { GeneralUtils } from '../general.util';
import { HttpException } from './http-exception';
import { ApiResponseError, ApiResponseSucess } from './http-response-types';
import { COMMON_MESSAGE, HTTP_STATUS } from './http-status';

export class ApiResponseFactory {
  static success<T>(
    data: T,
    message: string,
    status = HTTP_STATUS.OK
  ): ApiResponseSucess<T> {
    return { data, code: 'success', status, message };
  }

  static error(error: unknown): ApiResponseError {
    if (error instanceof HttpException)
      return { code: 'error', status: error.status, message: error.message };

    // In case of other errors
    console.log(
      `Technical Error (${GeneralUtils.formatBogotaDateTime(new Date())})`,
      error
    );
    return {
      code: 'error',
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message: COMMON_MESSAGE[HTTP_STATUS['INTERNAL_SERVER_ERROR']],
    };
  }
}
