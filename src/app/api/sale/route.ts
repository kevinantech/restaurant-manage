import { connectDatabase } from "@/backend/common/config/mongo";
import { ResponseCode } from "@/backend/common/constants";
import { ResponseModel } from "@/backend/common/entity/response-base.model";
import { ProductDatabase } from "@/backend/modules/product/infraestructure/product.database";
import { SaleUseCase } from "@/backend/modules/sale/application/sale.uc";
import { SaleDatabase } from "@/backend/modules/sale/infraestructure/sale.database";
import { validate } from "class-validator";
import { NextRequest } from "next/server";
import { SaleDto } from "./route.dto";

const productRepo = new ProductDatabase();

const saleRepo = new SaleDatabase();
const saleUseCase = new SaleUseCase(productRepo, saleRepo);

export async function POST(req: NextRequest): Promise<ResponseModel> {
  const data = (await req.json()) as SaleDto;

  if ((await validate(data)).length !== 0) {
    return new ResponseModel({
      ...ResponseCode["BAD REQUEST"],
      message: "Los datos no son válidos.",
    });
  }

  await connectDatabase();
  const result = await saleUseCase.registerSale(
    data.description,
    data.products,
    data.income
  );
  return new ResponseModel(result);
}

export async function GET(): Promise<ResponseModel> {
  await connectDatabase();
  const result = await saleUseCase.getSales();
  return new ResponseModel(result);
}
