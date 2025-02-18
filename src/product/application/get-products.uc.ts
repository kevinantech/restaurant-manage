import { ResponseCode } from '@/shared/_common/constants/response-codes';
import { IProductRepository } from '../domain/product.repository.interface';

export type IGetProductUseCase = ReturnType<typeof getProductsUseCase>;

export const getProductsUseCase =
  (productRepository: IProductRepository) => async (userId: string) => {
    try {
      const products = await productRepository.getProductsForUser(userId);
      return {
        ...ResponseCode.OK,
        data: products,
        message: 'Consulta exitosa',
      };
    } catch (e) {
      if (e instanceof Error) console.log('Error', e.message);
      return {
        ...ResponseCode['INTERNAL SERVER ERROR'],
        message: 'Unexpected error',
      };
    }
  };
