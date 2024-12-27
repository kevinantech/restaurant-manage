import { connectDatabase } from "@/backend/common/config/mongo";
import { ResponseCode } from "@/backend/common/constants";
import {
  IResponseBase,
  ResponseModel,
} from "@/backend/common/entity/response-base.model";
import { CreateAdminDto } from "@/backend/modules/admin/application/dto/create-admin.dto";
import { RegisterAdmin } from "@/backend/modules/admin/application/register-admin.uc";
import { AdminDatabase } from "@/backend/modules/admin/infrastructure/admin.database";
import { AppConfigDatabase } from "@/backend/modules/shared/appconfig/infrastructure/appconfig.database";
import { validate } from "class-validator";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest): Promise<ResponseModel> {
  const data = new CreateAdminDto(await req.json());
  if ((await validate(data)).length !== 0)
    return new ResponseModel({
      ...ResponseCode["BAD REQUEST"],
      message: "Los datos proporcionados no son válidos.",
    });

  await connectDatabase();
  const result = await new RegisterAdmin(
    new AdminDatabase(),
    new AppConfigDatabase()
  ).register(data);

  return new ResponseModel(result);
}

// TODO: Move to controller for the app configuration.
export type ADMIN_SETUP = {
  isAdminSetup: boolean;
};
type R = IResponseBase<ADMIN_SETUP>;
export async function GET(): Promise<ResponseModel> {
  await connectDatabase();
  const result = await new AppConfigDatabase().findOne();

  if (!result || typeof result.isAdminSetup !== "boolean")
    return new ResponseModel({
      ...ResponseCode["NOT FOUND"],
      message: "El recurso no está disponible.",
    });
  return new ResponseModel({
    ...ResponseCode.OK,
    message: "Ok",
    data: { isAdminSetup: result.isAdminSetup },
  } as R);
}
