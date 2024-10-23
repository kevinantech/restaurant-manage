import { ResponseCode } from "@/backend/common/constants";
import { IResponseBase } from "@/backend/common/entity/response-base.model";
import { IProductRepository } from "../../product/domain/product.repository";
import { ISale } from "../domain/sale.entity";
import { ISaleRepository } from "../domain/sale.repository";
import { Sale } from "../domain/sale.value";

export class SaleUseCase {
  constructor(
    private readonly productRepo: IProductRepository,
    private readonly saleRepo: ISaleRepository
  ) {}

  async registerSale(
    description: string,
    products: string[],
    income: number
  ): Promise<IResponseBase<ISale>> {
    const productsObtained = await Promise.all(
      products.map((id) => this.productRepo.findById(id))
    );

    if (productsObtained.some((product) => product === null)) {
      return {
        ...ResponseCode["NOT FOUND"],
        message: "Productos no encontrados.",
      };
    }

    const formattedProducts = productsObtained.filter((product) => product !== null);

    if (formattedProducts.some(({ currentAmount }) => currentAmount < 1)) {
      return {
        ...ResponseCode["NOT FOUND"],
        message: "Productos insuficientes.",
      };
    }

    const updatedProducts = await Promise.all(
      formattedProducts.map((product) => {
        const currentAmount = product.currentAmount - 1;

        console.log(
          "🚀 ~ SaleUseCase ~ formattedProducts.map ~ currentAmount:",
          currentAmount
        );
        return this.productRepo.update(product.id, { currentAmount });
      })
    );

    console.log("🚀 ~ ProductUseCase ~ updatedProducts:", updatedProducts);

    if (updatedProducts.some((product) => product === null)) {
      return {
        ...ResponseCode["INTERNAL SERVER ERROR"],
        message: "Algo inesperado ocurrió.",
      };
    }

    const saleValue = new Sale(description, products, income);
    const result = await this.saleRepo.register(saleValue);

    if (!result) {
      return {
        ...ResponseCode["INTERNAL SERVER ERROR"],
        message: "Algo inesperado ocurrió.",
      };
    }

    return {
      ...ResponseCode.OK,
      message: "Venta agregada correctamente.",
      data: result,
    };
  }

  async getSales(): Promise<IResponseBase<ISale[]>> {
    const result = await this.saleRepo.find();

    if (!result) {
      return {
        ...ResponseCode["INTERNAL SERVER ERROR"],
        message: "Algo inesperado ocurrió.",
      };
    }

    return {
      ...ResponseCode.OK,
      message: "Ventas obtenidas correctamente.",
      data: result,
    };
  }
}
