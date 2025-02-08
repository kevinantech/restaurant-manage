import { ResponseCode } from '@/shared/_common/constants/response-codes';
import { IBaseResponse } from '@/shared/_common/entity/base-response.model';
import { IInventoryItem } from '../domain/inventory-item.entity';
import { InventoryItemRepository } from '../domain/inventory-item.repository';

export class GetInventoryItems {
  constructor(
    private readonly inventoryItemRepository: InventoryItemRepository
  ) {}

  async get(userId: string): Promise<IBaseResponse<IInventoryItem[]>> {
    const queryResult = await this.inventoryItemRepository.getItemsByUserId(
      userId
    );
    return {
      ...ResponseCode.OK,
      data: queryResult,
      message: 'Consulta exitosa',
    };
  }
}
