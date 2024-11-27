import { connectDatabase } from "@/backend/common/config/mongo";
import { ResponseCode } from "@/backend/common/constants";
import { ResponseModel } from "@/backend/common/entity/response-base.model";
import { AdminDatabase } from "@/backend/modules/admin/infrastructure/admin.database";

export async function GET(): Promise<ResponseModel> {
  await connectDatabase();
  const res = await new AdminDatabase().findByUsername("kevin");
  return new ResponseModel({ ...ResponseCode.OK, message: "Ok", data: res });
}
