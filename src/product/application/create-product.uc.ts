import { IInventoryRepository } from '@/inventory/domain/inventory.repository.interface';
import { ForbiddenError } from 'lib/errors/forbidden.error';
import { NotFoundError } from 'lib/errors/not-found.error';
import { ResponseBodyFactory } from 'lib/http/response-body.factory';
import { CreateProductBody } from '../domain/product.entity';
import { IProductRepository } from '../domain/product.repository.interface';

export type ICreateProductUseCase = ReturnType<typeof createProductUseCase>;

export const createProductUseCase =
  (
    productRepository: IProductRepository,
    itemsRepository: IInventoryRepository
  ) =>
  async (body: CreateProductBody, userId: string) => {
    const ingredientsFound = (
      await Promise.all(
        body.recipe.map(({ id }) => {
          return itemsRepository.getItemById(id);
        })
      )
    ).filter((ingr) => !!ingr);

    if (ingredientsFound.some((ingr) => ingr.userId !== userId)) {
      throw new ForbiddenError('No tienes permisos para crear este producto');
    }

    if (ingredientsFound.length !== body.recipe.length) {
      throw new NotFoundError('Uno o más ingredientes no están disponibles');
    }

    await productRepository.createProduct({ ...body, userId });
    return ResponseBodyFactory.success({});
  };
