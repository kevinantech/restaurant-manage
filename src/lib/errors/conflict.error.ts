import { HTTP_STATUS } from '../http/http-status';
import { RouteError } from './route.error';

export class ConflictError extends RouteError {
  constructor(message: string) {
    super(HTTP_STATUS.CONFLICT, message);
  }
}
