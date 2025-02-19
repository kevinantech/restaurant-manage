import { ResponseCode } from '../_common/constants/response-codes';
import { IBaseResponse } from './base-response';

export const ServerErrorResponse: IBaseResponse = {
  ...ResponseCode['INTERNAL SERVER ERROR'],
  message: 'Ha ocurrido un error inesperado',
};
