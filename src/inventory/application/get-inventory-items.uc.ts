import { ResponseCode } from '@/shared/_common/constants/response-codes';
import { IBaseResponse } from '@/shared/_common/entity/base-response.model';
import { InventoryItem } from '../domain/inventory-item.entity';
import { IInventoryRepository } from '../domain/inventory.repository.interface';

export type IGetInventoryItemsUseCase = ReturnType<
  typeof getInventoryItemsUseCase
>;

export const getInventoryItemsUseCase =
  (itemRepository: IInventoryRepository) =>
  async (userId: string): Promise<IBaseResponse<InventoryItem[]>> => {
    try {
      const queryResult = await itemRepository.getItemsForUser(userId);
      console.log('🚀 ~ queryResult:', queryResult);
      return {
        ...ResponseCode.OK,
        data: queryResult,
        message: 'Consulta exitosa',
      };
    } catch (e) {
      return {
        ...ResponseCode['INTERNAL SERVER ERROR'],
        message: 'Unexpected error',
        data: [],
      };
    }
  };
