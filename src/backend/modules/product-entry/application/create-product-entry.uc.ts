import { CreateProductEntryDto } from "./dto/create-product-entry.dto";
import { ProductEntry } from "../domain/product-entry.value";
import { ProductEntryRepository } from "../domain/product-entry.repository";
import { IResponseBase } from "@/backend/common/entity/response-base.model";
import { ResponseCode } from "@/backend/common/constants";
import { GeneralUtils } from "@/backend/common/utils/general.util";

/**
 * Registra insumos.
 * Estos insumos componen a los productos ofrecidos por el restaurante.
 * Consideraciones:
 * * Stock (stock) >= 0,
 * * Peso unitario (unitWeight) > 0
 */
export class CreateProductEntry {
  constructor(
    private readonly productEntryRepository: ProductEntryRepository
  ) {}

  async create(data: CreateProductEntryDto): Promise<IResponseBase> {
    const val = new ProductEntry(
      GeneralUtils.generateId(),
      data.name,
      data.category,
      data.unitOfMeasure,
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
