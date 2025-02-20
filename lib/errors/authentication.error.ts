import { HTTP_STATUS } from 'lib/http/http-status';
import { RouteError } from './route.error';

export class AuthenticationError extends RouteError {
  constructor(message: string = 'Autentificación fallida') {
    super(HTTP_STATUS.UNAUTHORIZED, message);
  }
}
