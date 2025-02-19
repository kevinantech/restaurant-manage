import { IBaseResponse } from '@/shared/entity/base-response';
import { IOrderRepository } from '../domain/order.repository.interface';
import { ResponseCode } from '@/shared/_common/constants/response-codes';
import { Order } from '../domain/order.entity';
import { ServerErrorResponse } from '@/shared/entity/common-responses';

export type IGetOrdersUseCase = ReturnType<typeof getOrdersUseCase>;

export const getOrdersUseCase =
  (orderRepository: IOrderRepository) =>
  async (userId: string): Promise<IBaseResponse<Order[]>> => {
    try {
      const queryResult = await orderRepository.getOrdersForUser(userId);
      return {
        ...ResponseCode.OK,
        data: queryResult,
        message: 'Órdenes obtenidas',
      };
    } catch (e) {
      if (e instanceof Error) console.log(e.message);
      return ServerErrorResponse;
    }
  };
