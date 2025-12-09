import { ResponseBodyFactory } from 'lib/http/response-body.factory';
import { IInventoryRepository } from '../domain/inventory.repository.interface';

export type IGetInventoryItemsUseCase = ReturnType<
  typeof getInventoryItemsUseCase
>;

export const getInventoryItemsUseCase =
  (itemRepository: IInventoryRepository) =>
  async (userId: string, page: number, limit: number) => {
    const queryResult = await itemRepository.getItemsForUser(
      { userId },
      page,
      limit
    );

    const totalDocuments = await itemRepository.getTotalItemsForUser({
      userId,
    });

    return ResponseBodyFactory.success({
      data: queryResult,
      pagination: {
        pageIndex: page,
        pageSize: queryResult.length,
        totalDocuments,
        totalPages: Math.ceil(totalDocuments / limit),
      },
    });
  };
