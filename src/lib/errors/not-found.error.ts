import { HTTP_STATUS } from '../http/http-status';
import { RouteError } from './route.error';

export class NotFoundError extends RouteError {
  constructor(message: string) {
    super(HTTP_STATUS.NOT_FOUND, message);
  }
}
