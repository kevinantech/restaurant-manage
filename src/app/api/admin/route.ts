import { connectDatabase } from "@/backend/common/config/mongo";
import { ResponseCode } from "@/backend/common/constants";
import { ResponseModel } from "@/backend/common/entity/response-base.model";
import { AdminSetup } from "@/backend/modules/admin/application/admin-setup.uc";
import { CreateAdminDto } from "@/backend/modules/admin/application/dto/create-admin.dto";
import { AdminDatabase } from "@/backend/modules/admin/infrastructure/admin.database";
import { validate } from "class-validator";
import { NextRequest } from "next/server";

/* Route designed for the fisrt setup to the admin */
export async function POST(req: NextRequest): Promise<ResponseModel> {
  const data = new CreateAdminDto(await req.json());
  if ((await validate(data)).length !== 0)
    return new ResponseModel({
      ...ResponseCode["BAD REQUEST"],
      message: "Los datos proporcionados no son válidos.",
    });

  await connectDatabase();
  const result = await new AdminSetup(new AdminDatabase()).setup(data);
  return new ResponseModel(result);
}

export async function GET(): Promise<ResponseModel> {
  await connectDatabase();
  const res = await new AdminDatabase().findSetup();
  return new ResponseModel({ ...ResponseCode.OK, message: "Ok", data: res });
}
