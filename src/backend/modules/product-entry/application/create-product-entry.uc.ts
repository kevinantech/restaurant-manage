import { CreateProductEntryDto } from "./dto/create-product-entry.dto";
import { ProductEntry } from "../domain/product.value";
import { ProductEntryRepository } from "../domain/product-entry.repository";
import { IResponseBase } from "@/backend/common/entity/response-base.model";
import { ResponseCode } from "@/backend/common/constants";

export class CreateProductEntry {
  constructor(private readonly productEntryRepository: ProductEntryRepository) {}

  async create(data: CreateProductEntryDto): Promise<IResponseBase> {
    const val = new ProductEntry(
      data.name,
      data.category,
      data.unitOfMeausure,
      data.unitWeight,
      data.stock
    );
    await this.productEntryRepository.save(val);
    return {
      ...ResponseCode.OK,
      message: "Producto agregado correctamente.",
    };
  }
}
