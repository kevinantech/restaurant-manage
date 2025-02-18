import { IBaseResponse } from '@/shared/_common/entity/base-response.model';
import { IInventoryRepository } from '../domain/inventory.repository.interface';
import { CreateInventoryItemBody } from '../domain/inventory-item.entity';
import { ResponseCode } from '@/shared/_common/constants/response-codes';

export type ICreateInventoryItemUseCase = ReturnType<
  typeof createInventoryItemUseCase
>;

export const createInventoryItemUseCase =
  (itemsRepository: IInventoryRepository) =>
  async (
    body: CreateInventoryItemBody,
    userId: string
  ): Promise<IBaseResponse> => {
    try {
      await itemsRepository.createItem({ ...body, userId });
      return { ...ResponseCode.OK, message: 'Inventario agregado' };
    } catch (e) {
      if (e instanceof Error) console.log('Error', e.message);
      return {
        ...ResponseCode['INTERNAL SERVER ERROR'],
        message: 'Unexpected error',
      };
    }
  };
