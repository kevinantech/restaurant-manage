import { ResponseBodyFactory } from 'lib/http/response-body.factory';
import { IOrderRepository } from '../domain/order.repository.interface';

export type IGetOrdersUseCase = ReturnType<typeof getOrdersUseCase>;

export const getOrdersUseCase =
  (orderRepository: IOrderRepository) => async (userId: string) => {
    const queryResult = await orderRepository.getOrdersForUser(userId);
    return ResponseBodyFactory.success({ data: queryResult });
  };
