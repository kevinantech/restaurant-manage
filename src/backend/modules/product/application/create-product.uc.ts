import { ResponseCode } from "@/backend/common/constants";
import { IResponseBase } from "@/backend/common/entity/response-base.model";
import { GeneralUtils } from "@/backend/common/utils/general.util";
import { ProductEntryRepository } from "../../product-entry/domain/product-entry.repository";
import { ProductRepository } from "../domain/product.repository";
import { Product } from "../domain/product.value";
import { CreateProductDto } from "./dto/create-product.dto";

export class CreateProduct {
  constructor(
    private readonly inventoryItemRepository: ProductEntryRepository,
    private readonly productRepository: ProductRepository
  ) {}
  async create(data: CreateProductDto): Promise<IResponseBase> {
    const registeredIngredients = (
      await this.inventoryItemRepository.findAll()
    ).map(({ id }) => id);

    if (
      !data.ingredients.every(({ inventoryItemId }) =>
        registeredIngredients.includes(inventoryItemId)
      )
    )
      return {
        ...ResponseCode["BAD REQUEST"],
        message: "Uno o más ingredientes no están disponibles",
      };

    const val = new Product(
      GeneralUtils.generateId(),
      data.name,
      data.description,
      data.ingredients,
      data.price
    );
    await this.productRepository.save(val);
    return {
      ...ResponseCode.OK,
      message: "Producto agregado correctamente.",
    };
  }
}
