import { ResponseCode } from '@/shared/_common/constants/response-codes';
import { IBaseResponse } from '@/shared/_common/entity/base-response.model';
import { GeneralUtils } from 'utils/general.util';
import { InventoryItemRepository } from '../domain/inventory-item.repository';
import { InventoryItem } from '../domain/inventory-item.value';
import { CreateInventoryItemDto } from './dto/create-inventory-item.dto';
import { SystemUserRepository } from '@/shared/systemuser/domain/systemuser.repository';

/**
 * Registra insumos.
 * Estos insumos componen a los productos ofrecidos por el restaurante.
 * Consideraciones:
 * * Stock (stock) >= 0,
 * * Peso unitario (unitWeight) > 0
 */
export class CreateInventoryItem {
  constructor(
    private readonly adminRepository: SystemUserRepository,
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

    const userExists = await this.adminRepository.findUserById(data.userId);
    if (!userExists) {
      return {
        ...ResponseCode.UNAUTHORIZED,
        message: 'Acceso denegado',
      };
    }

    await this.inventoryItemRepository.createItem(val);
    return {
      ...ResponseCode.OK,
      message: 'Inventario agregado',
    };
  }
}
