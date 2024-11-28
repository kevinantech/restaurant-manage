import { connectDatabase } from "@/backend/common/config/mongo";
import { ResponseCode } from "@/backend/common/constants";
import { ResponseModel } from "@/backend/common/entity/response-base.model";
import { CreateProductEntry } from "@/backend/modules/product-entry/application/create-product-entry.uc";
import { CreateProductEntryDto } from "@/backend/modules/product-entry/application/dto/create-product-entry.dto";
import { ProductEntryDatabase } from "@/backend/modules/product-entry/infraestructure/product-entry.database";
import { validate } from "class-validator";
import { NextRequest } from "next/server";

const db = new ProductEntryDatabase();

export async function POST(req: NextRequest): Promise<ResponseModel> {
  const data = await req.json();
  const dto = new CreateProductEntryDto(
    data.name,
    data.category,
    data.unit,
    data.stock,
    data.restockThreshold
  );

  if ((await validate(dto)).length !== 0)
    return new ResponseModel({ ...ResponseCode["BAD REQUEST"], message: "Incorrect format." });

  await connectDatabase();
  const res = await new CreateProductEntry(db).create(data);
  return new ResponseModel(res);
}
