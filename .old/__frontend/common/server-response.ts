import { BaseResponse } from '@/backend/common/entity/response-base.model';

export type ServerResponse<T = any> = Omit<BaseResponse<T>, 'code' | 'status'>;
