'use server';
import { createInventoryItemUseCase } from '@/inventory/application/create-inventory-item.uc';
import {
  CreateInventoryItemBody,
  CreateInventoryItemBodySchema,
} from '@/inventory/domain/inventory-item.entity';
import { InventoryItemRepository } from '@/inventory/infraestructure/inventory-item.repository';
import { AuthenticationError } from 'lib/errors/authentication.error';
import { ValidationError } from 'lib/errors/validation.error';
import { ActionErrorHandler } from 'lib/handlers/error.handler';
import { dbConnect } from 'lib/mongoose/connect';
import { session } from 'lib/next-auth/session.server';

export const createInventoryItem = async (body: CreateInventoryItemBody) => {
  try {
    const user = await session();
    if (!user) throw new AuthenticationError();

    const { success } = CreateInventoryItemBodySchema.safeParse(body);
    if (!success) throw new ValidationError();

    await dbConnect();
    const itemsRepository = new InventoryItemRepository();
    const _createInventoryItem = createInventoryItemUseCase(itemsRepository);
    return await _createInventoryItem(body, user.id);
  } catch (error) {
    return new ActionErrorHandler(error).handle();
  }
};
