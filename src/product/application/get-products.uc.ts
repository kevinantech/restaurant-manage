import { InventoryItem } from '@/inventory/domain/inventory-item.entity';
import { IInventoryRepository } from '@/inventory/domain/inventory.repository.interface';
import { ResponseBodyFactory } from 'lib/http/response-body.factory';
import { IProductRepository } from '../domain/product.repository.interface';

export type IGetProductUseCase = ReturnType<typeof getProductsUseCase>;

export const getProductsUseCase =
  (
    productRepository: IProductRepository,
    itemRepository: IInventoryRepository
  ) =>
  async (userId: string, page: number, limit: number) => {
    const queryResult = await productRepository.getProductsForUser(
      { userId },
      page,
      limit
    );

    const totalDocuments = await productRepository.getTotalProductsForUser({
      userId,
    });

    // Extract the ingredients from the products query without duplicates
    const _recipeItems = [...queryResult[0].recipe];
    for (let i = 1; i < queryResult.length; i++) {
      for (const recipeItem of queryResult[i].recipe) {
        let isDuplicated = false;
        for (const _recipeItem of _recipeItems) {
          if (recipeItem.id === _recipeItem.id) {
            isDuplicated = true;
            break;
          }
        }
        if (!isDuplicated) _recipeItems.push(recipeItem);
      }
    }

    const items = await Promise.all(
      _recipeItems.map(({ id }) => itemRepository.getItemById(id))
    );

    const itemsById = items.reduce((acc, item) => {
      if (item) acc[item.id] = item;
      return acc;
    }, {} as { [id: string]: InventoryItem });

    const products = queryResult.map((product) => ({
      ...product,
      recipe: product.recipe.map((item) => ({
        ...item,
        name: itemsById[item.id]?.name,
        unitOfMeasure: itemsById[item.id]?.unitOfMeasure,
      })),
    }));

    return ResponseBodyFactory.success({
      data: products,
      pagination: {
        pageIndex: page,
        pageSize: queryResult.length,
        totalDocuments,
        totalPages: Math.ceil(totalDocuments / limit),
      },
    });
  };
