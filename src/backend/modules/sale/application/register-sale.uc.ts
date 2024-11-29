import { IResponseBase } from "@/backend/common/entity/response-base.model";
import { OrderRepository } from "../../order/domain/order.repository";
import { SaleRepository } from "../domain/sale.repository";
import { RegisterSaleDto } from "./dto/register-sale";
import { ResponseCode } from "@/backend/common/constants";
import { GeneralUtils } from "@/backend/common/utils/general.util";
import { Sale } from "../domain/sale.value";

export class RegisterSale {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly saleRepository: SaleRepository
  ) {}

  async register(data: RegisterSaleDto): Promise<IResponseBase> {
    const order = await this.orderRepository.findById(data.orderId);
    if (!order)
      return { ...ResponseCode["NOT FOUND"], message: "Orden no disponible." };

    const value = new Sale(
      GeneralUtils.generateId(),
      order.id,
      data.description,
      order.totalAmount
    );

    await this.saleRepository.save(value);
    return { ...ResponseCode.OK, message: "La venta ha sido registrada." };
  }
}
