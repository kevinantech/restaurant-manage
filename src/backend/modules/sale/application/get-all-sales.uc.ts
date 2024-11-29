import { ResponseCode } from "@/backend/common/constants";
import { ISale } from "../domain/sale.entity";
import { SaleRepository } from "../domain/sale.repository";
import { IResponseBase } from "@/backend/common/entity/response-base.model";

export class GetAllSales {
  constructor(private readonly saleRepository: SaleRepository) {}
  async get(): Promise<IResponseBase<ISale[]>> {
    const res = await this.saleRepository.findAll();

    if (!res)
      return {
        ...ResponseCode["INTERNAL SERVER ERROR"],
        message: "Recurso no encontrado.",
      };

    return { ...ResponseCode.OK, data: res, message: "Consulta existosa." };
  }
}
