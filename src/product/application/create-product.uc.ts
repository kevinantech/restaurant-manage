import { IInventoryRepository } from '@/inventory/domain/inventory.repository.interface';
import { IBaseResponse } from '@/shared/entity/base-response';
import { CreateProductBody } from '../domain/product.entity';
import { IProductRepository } from '../domain/product.repository.interface';
import { ResponseCode } from '@/shared/_common/constants/response-codes';

export type ICreateProductUseCase = ReturnType<typeof createProductUseCase>;

export const createProductUseCase =
  (
    productRepository: IProductRepository,
    itemsRepository: IInventoryRepository
  ) =>
  async (body: CreateProductBody, userId: string): Promise<IBaseResponse> => {
    try {
      const ingredientsFound = (
        await Promise.all(
          body.recipe.map(({ id }) => {
            return itemsRepository.getItemById(id);
          })
        )
      ).filter((ingr) => !!ingr);

      if (ingredientsFound.some((ingr) => ingr.userId !== userId)) {
        return {
          ...ResponseCode['FORBIDDEN'],
          message: 'No tienes permisos para crear este producto',
        };
      }

      if (ingredientsFound.length !== body.recipe.length) {
        return {
          ...ResponseCode['BAD REQUEST'],
          message: 'Uno o más ingredientes no están disponibles',
        };
      }

      await productRepository.createProduct({
        ...body,
        userId,
      });

      return {
        ...ResponseCode.OK,
        message: 'Producto agregado',
      };
    } catch (e) {
      if (e instanceof Error) console.log('Error', e.message);
      return {
        ...ResponseCode['INTERNAL SERVER ERROR'],
        message: 'Unexpected error',
      };
    }
  };
