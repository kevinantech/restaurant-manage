import "@/backend/common/config/global";
import { connectDatabase } from "@/backend/common/config/mongo";
import { ResponseCode } from "@/backend/common/constants";
import { ResponseModel } from "@/backend/common/entity/response-base.model";
import { ProductEntryDatabase } from "@/backend/modules/product-entry/infraestructure/product-entry.database";
import { CreateProduct } from "@/backend/modules/product/application/create-product.uc";
import { CreateProductDto } from "@/backend/modules/product/application/dto/create-product.dto";
import { GetAllProducts } from "@/backend/modules/product/application/get-all-products.uc";
import { ProductDatabase } from "@/backend/modules/product/infrastructure/product.database";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NextRequest } from "next/server";

const productCollection = new ProductDatabase();
const ingredientsCollection = new ProductEntryDatabase();

export async function POST(req: NextRequest): Promise<ResponseModel> {
  const reqBody = await req.json();

  const data = new CreateProductDto(
    reqBody.name,
    reqBody.description,
    reqBody.ingredients,
    reqBody.price
  );

  if ((await validate(plainToInstance(CreateProductDto, data))).length !== 0) {
    return new ResponseModel({
      ...ResponseCode["BAD REQUEST"],
      message: "Los datos no son válidos.",
    });
  }

  await connectDatabase();
  const result = await new CreateProduct(
    ingredientsCollection,
    productCollection
  ).create(data);
  return new ResponseModel(result);
}

export async function GET(req: NextRequest): Promise<ResponseModel> {
  await connectDatabase();
  const result = await new GetAllProducts(productCollection).get();
  return new ResponseModel(result);
}
