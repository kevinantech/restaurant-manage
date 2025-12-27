import { HTTP_STATUS } from '../http/http-status';
import { RouteError } from './route.error';

export class ForbiddenError extends RouteError {
  constructor(message: string) {
    super(HTTP_STATUS.FORBIDDEN, message);
  }
}
