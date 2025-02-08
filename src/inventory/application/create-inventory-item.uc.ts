import { ResponseCode } from '@/shared/_common/constants/response-codes';
import { IBaseResponse } from '@/shared/_common/entity/base-response.model';
import { GeneralUtils } from 'utils/general.util';
import { InventoryItemRepository } from '../domain/inventory-item.repository';
import { InventoryItem } from '../domain/inventory-item.value';
import { CreateInventoryItemDto } from './dto/create-inventory-item.dto';

/**
 * Registra insumos.
 * Estos insumos componen a los productos ofrecidos por el restaurante.
 * Consideraciones:
 * * Stock (stock) >= 0,
 * * Peso unitario (unitWeight) > 0
 */
export class CreateInventoryItem {
  constructor(
    private readonly inventoryItemRepository: InventoryItemRepository
  ) {}

  async create(data: CreateInventoryItemDto): Promise<IBaseResponse> {
    const val = new InventoryItem(
      GeneralUtils.generateId(),
      data.name,
      data.category,
      data.unitOfMeasure,
      data.unitWeight,
      data.stock,
      data.userId
    );
    await this.inventoryItemRepository.createItem(val);
    return {
      ...ResponseCode.OK,
      message: 'Producto agregado correctamente.',
    };
  }
}
