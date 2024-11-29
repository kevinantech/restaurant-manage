import { ResponseCode } from "@/backend/common/constants";
import { IOrder } from "../domain/order.entity";
import { OrderRepository } from "../domain/order.repository";
import { IResponseBase } from "@/backend/common/entity/response-base.model";

export class GetAllOrders {
  constructor(private readonly orderDatabase: OrderRepository) {}
  async get(): Promise<IResponseBase<IOrder[]>> {
    const orders = await this.orderDatabase.findAll();

    if (!orders)
      return {
        ...ResponseCode["NOT FOUND"],
        message: "Recurso no disponible.",
      };

    return { ...ResponseCode.OK, data: orders, message: "Consulta exitosa." };
  }
}
