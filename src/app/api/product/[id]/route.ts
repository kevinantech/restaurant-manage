import { connectDatabase } from "@/backend/common/config/mongo";
import { ResponseModel } from "@/backend/common/entity/response-base.model";
import { ProductUseCase } from "@/backend/modules/product/application/product.uc";
import { ProductDatabase } from "@/backend/modules/product/infraestructure/product.database";
import { NextRequest } from "next/server";

const productRepo = new ProductDatabase();
const productUseCase = new ProductUseCase(productRepo);

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<ResponseModel> {
  const slug = (await params).id;
  await connectDatabase();
  const result = await productUseCase.getProduct(slug);
  return new ResponseModel(result);
}
