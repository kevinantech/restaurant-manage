import "@/backend/common/config/global";
import { connectDatabase } from "@/backend/common/config/mongo";
import { ResponseCode } from "@/backend/common/constants";
import { ResponseModel } from "@/backend/common/entity/response-base.model";
import { ProductEntryDatabase } from "@/backend/modules/product-entry/infraestructure/product-entry.database";
import { ProductDatabase } from "@/backend/modules/product/infrastructure/product.database";
import { CreateOrder } from "@/backend/modules/shared/order/application/create-order.uc";
import {
  CreateOrderDto,
  OrderItemDto,
} from "@/backend/modules/shared/order/application/dto/create-order.dto";
import { OrderDatabase } from "@/backend/modules/shared/order/infrastructure/order.database";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NextRequest } from "next/server";

const orderCollection = new OrderDatabase();
const productCollection = new ProductDatabase();
const ingredientsCollection = new ProductEntryDatabase();

export async function POST(req: NextRequest): Promise<ResponseModel> {
  const reqBody = await req.json();
  const data = new CreateOrderDto(reqBody.items);

  if ((await validate(plainToInstance(CreateOrderDto, data))).length !== 0) {
    return new ResponseModel({
      ...ResponseCode["BAD REQUEST"],
      message: "Los datos no son válidos.",
    });
  }

  await connectDatabase();
  const result = await new CreateOrder(
    orderCollection,
    productCollection,
    ingredientsCollection
  ).create(data);
  return new ResponseModel(result);
}

/* export async function GET(req: NextRequest): Promise<ResponseModel> {
  await connectDatabase();
  const result = await new GetAllProducts(productCollection).get();
  return new ResponseModel(result);
}
 */
