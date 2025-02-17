'use server';
import { createInventoryItemUseCase } from '@/inventory/application/create-inventory-item.uc';
import {
  CreateInventoryItemBody,
  CreateInventoryItemBodySchema,
} from '@/inventory/domain/inventory-item.entity';
import { InventoryItemRepository } from '@/inventory/infraestructure/inventory-item.repository';
import { ResponseCode } from '@/shared/_common/constants/response-codes';
import { connectDB } from 'lib/mongoose/connect';
import { session } from 'lib/nextauth/session.server';

const itemsRepository = new InventoryItemRepository();

export const createInventoryItem = async (body: CreateInventoryItemBody) => {
  const user = await session();
  if (user.status === 'unauthenticated') return user.error;

  const { data } = CreateInventoryItemBodySchema.safeParse(body);

  if (!data)
    return {
      ...ResponseCode['BAD REQUEST'],
      message: 'Formato inválido',
    };

  const _createInventoryItem = createInventoryItemUseCase(itemsRepository);

  await connectDB();
  const result = await _createInventoryItem(body, user.data.id);
  return result;
};
