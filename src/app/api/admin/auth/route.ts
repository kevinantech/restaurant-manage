import { ResponseCode } from "@/backend/common/constants";
import { ResponseModel } from "@/backend/common/entity/response-base.model";
import { AdminUC } from "@/backend/modules/admin/application/admin.uc";
import { AdminDatabase } from "@/backend/modules/admin/infrastructure/admin.database";
import { AuthAdminDto } from "@/backend/modules/admin/infrastructure/dto/auth-admin.dto";
import { validate } from "class-validator";

const adminDatabase = new AdminDatabase();
const adminUseCase = new AdminUC(adminDatabase);

/* Handle sign-in request */
export async function POST(req: Request): Promise<ResponseModel> {
  const data = (await req.json()) as AuthAdminDto;
  if ((await validate(data)).length !== 0)
    return new ResponseModel({
      ...ResponseCode["BAD REQUEST"],
      message: "Formato de datos incorrecto.",
    });
  const result = await adminUseCase.auth(data.uid);
  return new ResponseModel(result);
}
