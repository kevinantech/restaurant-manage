'use server';
import { InventoryItemRepository } from '@/inventory/infraestructure/inventory-item.repository';
import { createOrderUseCase } from '@/order/application/create-order.uc';
import {
  CreateOrderBody,
  CreateOrderBodySchema,
} from '@/order/domain/order.entity';
import { OrderRepository } from '@/order/infrastructure/order.repository';
import { ProductRepository } from '@/product/infrastructure/product.repository';
import { AuthenticationError } from 'lib/errors/authentication.error';
import { ValidationError } from 'lib/errors/validation.error';
import { ActionErrorHandler } from 'lib/handlers/error.handler';
import { dbConnect } from 'lib/mongoose/connect';
import { session } from 'lib/next-auth/session.server';

export const createOrder = async (body: CreateOrderBody) => {
  try {
    const user = await session();
    if (!user) throw new AuthenticationError();

    const { success } = CreateOrderBodySchema.safeParse(body);
    if (!success) throw new ValidationError();

    await dbConnect();
    const _createOrder = createOrderUseCase(
      new OrderRepository(),
      new ProductRepository(),
      new InventoryItemRepository()
    );
    return await _createOrder(body, user.id);
  } catch (error) {
    return new ActionErrorHandler(error).handle();
  }
};
