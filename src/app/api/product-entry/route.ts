import { connectDatabase } from "@/backend/common/config/mongo";
import { ResponseCode } from "@/backend/common/constants";
import { ResponseModel } from "@/backend/common/entity/response-base.model";
import { CreateProductEntry } from "@/backend/modules/product-entry/application/create-product-entry.uc";
import { CreateProductEntryDto } from "@/backend/modules/product-entry/application/dto/create-product-entry.dto";
import { GetAllProductEntries } from "@/backend/modules/product-entry/application/get-all-product-entries.uc";
import { ProductEntryDatabase } from "@/backend/modules/product-entry/infraestructure/product-entry.database";
import { validate } from "class-validator";
import { NextRequest } from "next/server";

const db = new ProductEntryDatabase();

export async function POST(req: NextRequest): Promise<ResponseModel> {
  const reqBody = await req.json();
  const data = new CreateProductEntryDto(
    reqBody.name,
    reqBody.category,
    reqBody.unitOfMeasure,
    reqBody.unitWeight,
    reqBody.stock
  );

  if ((await validate(data)).length !== 0)
    return new ResponseModel({
      ...ResponseCode["BAD REQUEST"],
      message: "Incorrect format.",
    });

  await connectDatabase();
  const res = await new CreateProductEntry(db).create(reqBody);
  return new ResponseModel(res);
}

export async function GET() {
  await connectDatabase();
  const res = await new GetAllProductEntries(db).get();
  return new ResponseModel(res);
}
