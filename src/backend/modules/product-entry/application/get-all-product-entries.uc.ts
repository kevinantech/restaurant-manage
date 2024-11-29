import { IResponseBase } from "@/backend/common/entity/response-base.model";
import { IProductEntry } from "../domain/product-entry.entity";
import { ProductEntryRepository } from "../domain/product-entry.repository";
import { ResponseCode } from "@/backend/common/constants";

export class GetAllProductEntries {
  constructor(
    private readonly productEntryRepository: ProductEntryRepository
  ) {}

  async get(): Promise<IResponseBase<IProductEntry[]>> {
    const values = await this.productEntryRepository.findAll();

    return {
      ...ResponseCode.OK,
      data: values,
      message: "Consulta exitosa.",
    };
  }
}
