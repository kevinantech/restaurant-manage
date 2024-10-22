import { Units } from "@/backend/common/constants/units-enum";
import { IProduct } from "../domain/product.entity";
import { Product } from "../domain/product.value";
import { IProductRepository } from "../domain/product.repository";
import { IResponseBase } from "@/backend/common/entity/response-base.model";
import { ResponseCode } from "@/backend/common/constants";

export class ProductUseCase {
  constructor(private readonly productRepo: IProductRepository) {}

  async registerProduct(
    name: string,
    initialAmount: number,
    weightPerUnit: number,
    unit: Units,
    cost: number
  ): Promise<IResponseBase<IProduct>> {
    const productValue = new Product(name, initialAmount, weightPerUnit, unit, cost);
    const result = await this.productRepo.registerProduct(productValue);

    if (!result) {
      return {
        ...ResponseCode["INTERNAL SERVER ERROR"],
        message: "Algo inesperado ocurrió.",
      };
    }

    return {
      ...ResponseCode.OK,
      message: "Producto agregado correctamente.",
      data: result,
    };
  }

  async getProducts(): Promise<IResponseBase<IProduct[]>> {
    const result = await this.productRepo.getProducts();

    if (!result) {
      return {
        ...ResponseCode["INTERNAL SERVER ERROR"],
        message: "Algo inesperado ocurrió.",
      };
    }

    return {
      ...ResponseCode.OK,
      message: "Productos obtenidos correctamente.",
      data: result,
    };
  }
}
