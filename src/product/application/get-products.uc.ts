import { ResponseBodyFactory } from 'lib/http/response-body.factory';
import { IProductRepository } from '../domain/product.repository.interface';

export type IGetProductUseCase = ReturnType<typeof getProductsUseCase>;

export const getProductsUseCase =
  (productRepository: IProductRepository) => async (userId: string) => {
    const queryResult = await productRepository.getProductsForUser(userId);
    return ResponseBodyFactory.success({ data: queryResult });
  };
