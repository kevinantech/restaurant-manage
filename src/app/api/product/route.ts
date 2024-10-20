import { connectDatabase } from "@/backend/common/config/mongo";
import { ResponseCode } from "@/backend/common/constants";
import { ResponseModel } from "@/backend/common/entity/response-base.model";
import { ProductUseCase } from "@/backend/modules/product/application/product.uc";
import { ProductDatabase } from "@/backend/modules/product/infraestructure/product.database";
import { validate } from "class-validator";
import { NextRequest } from "next/server";
import { ProductDto } from "./route.dto";

const productRepo = new ProductDatabase();
const productUseCase = new ProductUseCase(productRepo);

export async function POST(req: NextRequest): Promise<ResponseModel> {
  const data = (await req.json()) as ProductDto;

  if ((await validate(data)).length !== 0) {
    return new ResponseModel({
      ...ResponseCode["BAD REQUEST"],
      message: "Los datos no son válidos.",
    });
  }

  await connectDatabase();
  const result = await productUseCase.registerProduct(data.name, data.unit);
  return new ResponseModel(result);
}
