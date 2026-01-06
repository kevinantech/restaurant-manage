import { dbConnect } from '../mongoose/connect';
import { ApiResponseFactory } from './http-response';
import { ApiResponseSucess } from './http-response-types';
import { InputValidator } from './http-validation';

/**
 * Crea una acción HTTP tipada y segura.
 *
 * @typeParam T - Tipo del input validado que recibe el handler
 * @typeParam S - Tipo del esquema usado por el validador
 * @typeParam R - Tipo del payload de respuesta en caso de éxito
 */
export const createAction = <T, S, R>(
  validator: InputValidator<T, S>,
  handler: (input: T) => Promise<ApiResponseSucess<R>> | ApiResponseSucess<R>,
  options: {
    dbConnect?: boolean;
  }
) => {
  return async (body: unknown) => {
    try {
      const input = await validator.parse(body);
      if (options.dbConnect) await dbConnect();
      return await handler(input);
    } catch (error) {
      return ApiResponseFactory.error(error);
    }
  };
};
