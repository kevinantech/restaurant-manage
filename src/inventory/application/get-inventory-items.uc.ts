import { ResponseBodyFactory } from 'lib/http/response-body.factory';
import { IInventoryRepository } from '../domain/inventory.repository.interface';

export type IGetInventoryItemsUseCase = ReturnType<
  typeof getInventoryItemsUseCase
>;

export const getInventoryItemsUseCase =
  (itemRepository: IInventoryRepository) => async (userId: string) => {
    const queryResult = await itemRepository.getItemsForUser(userId);
    return ResponseBodyFactory.success({ data: queryResult });
  };
