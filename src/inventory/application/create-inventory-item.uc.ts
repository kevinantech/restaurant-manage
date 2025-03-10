import { ResponseBodyFactory } from 'lib/http/response-body.factory';
import { CreateInventoryItemBody } from '../domain/inventory-item.entity';
import { IInventoryRepository } from '../domain/inventory.repository.interface';

export type ICreateInventoryItemUseCase = ReturnType<
  typeof createInventoryItemUseCase
>;

export const createInventoryItemUseCase =
  (itemRepository: IInventoryRepository) =>
  async (body: CreateInventoryItemBody, userId: string) => {
    await itemRepository.createItem({ ...body, userId });
    return ResponseBodyFactory.success({});
  };
