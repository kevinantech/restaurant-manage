import { ResponseBodyFactory } from 'lib/http/response-body.factory';
import { IOrderRepository } from '../domain/order.repository.interface';
import { IProductRepository } from '@/product/domain/product.repository.interface';

export type IGetOrdersUseCase = ReturnType<typeof getOrdersUseCase>;

export const getOrdersUseCase =
  (orderRepository: IOrderRepository, productRepository: IProductRepository) =>
  async (userId: string) => {
    const queryResult = await orderRepository.getOrdersForUser(userId);
    return ResponseBodyFactory.success({ data: queryResult });
  };
