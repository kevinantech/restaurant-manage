import { HTTP_STATUS } from 'lib/http/http-status';
import { RouteError } from './route.error';

export class ValidationError extends RouteError {
  constructor(message = 'Formato inválido') {
    super(HTTP_STATUS.BAD_REQUEST, message);
  }
}
