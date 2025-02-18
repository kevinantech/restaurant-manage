'use server';

import { InventoryItemRepository } from '@/inventory/infraestructure/inventory-item.repository';
import { createOrderUseCase } from '@/order/application/create-order.uc';
import {
  CreateOrderBody,
  CreateOrderBodySchema,
} from '@/order/domain/order.entity';
import { OrderRepository } from '@/order/infrastructure/order.repository';
import { ProductRepository } from '@/product/infrastructure/product.repository';
import { ResponseCode } from '@/shared/_common/constants/response-codes';
import { IBaseResponse } from '@/shared/_common/entity/base-response.model';
import { dbConnect } from 'lib/mongoose/connect';
import { session } from 'lib/nextauth/session.server';

export const createOrder = async (
  body: CreateOrderBody
): Promise<IBaseResponse> => {
  const user = await session();
  if (user.status === 'unauthenticated') return user.error;
  const { data } = CreateOrderBodySchema.safeParse(body);

  if (!data) {
    return {
      ...ResponseCode['BAD REQUEST'],
      message: 'Formato inválido',
    };
  }

  await dbConnect();
  const _createOrder = createOrderUseCase(
    new OrderRepository(),
    new ProductRepository(),
    new InventoryItemRepository()
  );

  const result = await _createOrder(data, user.data.id);
  return result;
};
