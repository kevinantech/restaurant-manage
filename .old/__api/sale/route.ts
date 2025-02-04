import { connectDatabase } from "@/backend/common/config/mongo";
import { ResponseModel } from "@/backend/common/entity/response-base.model";
import { GetAllSales } from "@/backend/modules/sale/application/get-all-sales.uc";
import { SaleDatabase } from "@/backend/modules/sale/infraestructure/sale.database";

export async function GET(): Promise<ResponseModel> {
  await connectDatabase();
  const result = await new GetAllSales(new SaleDatabase()).get();
  return new ResponseModel(result);
}

/* export async function POST(req: NextRequest): Promise<ResponseModel> {
  const reqBody = await req.json();
  const data = new RegisterSaleDto(
    reqBody.orderId,
    reqBody.description,
    reqBody.income
  );

  if ((await validate(data)).length !== 0) {
    return new ResponseModel({
      ...ResponseCode["BAD REQUEST"],
      message: "Los datos no son válidos.",
    });
  }

  await connectDatabase();
  const result = await new RegisterSale(
    new OrderDatabase(),
    new SaleDatabase()
  ).register(data);
  return new ResponseModel(result);
} */
