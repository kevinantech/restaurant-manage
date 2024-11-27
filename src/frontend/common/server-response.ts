import { IResponseBase } from "@/backend/common/entity/response-base.model";

export type ServerResponse<T = any> = Omit<IResponseBase<T>, "code" | "status">;
