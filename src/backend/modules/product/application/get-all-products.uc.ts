import { IResponseBase } from "@/backend/common/entity/response-base.model";
import { ProductRepository } from "../domain/product.repository";
import { IProduct } from "../domain/product.entity";
import { ResponseCode } from "@/backend/common/constants";

export class GetAllProducts {
  constructor(private readonly productRepository: ProductRepository) {}

  async get(): Promise<IResponseBase<IProduct[]>> {
    const products = await this.productRepository.findAll();
    return {
      ...ResponseCode.OK,
      data: products,
      message: "Consulta exitosa.",
    };
  }
}
