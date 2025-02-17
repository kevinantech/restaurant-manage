'use server';

import { InventoryItemDatabase } from '@/inventory/infraestructure/inventory-item.database';
import { createOrderUseCase } from '@/order/application/create-order.uc';
import { OrderRepository } from '@/order/infrastructure/order.repository';
import { ProductDatabase } from '@/product/infrastructure/product.database';
import { IBaseResponse } from '@/shared/_common/entity/base-response.model';
import { session } from 'lib/nextauth/session.server';

export const createOrder = async (data: any): Promise<IBaseResponse> => {
  const user = await session();
  if (user.status === 'unauthenticated') return user.error;

  const _createOrderUseCase = createOrderUseCase(
    new OrderRepository(),
    new ProductDatabase(),
    new InventoryItemDatabase()
  );

  const result = await _createOrderUseCase(data, user.data.id);
  return result;
};
