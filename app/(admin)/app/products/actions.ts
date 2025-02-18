'use server';
import { InventoryItemRepository } from '@/inventory/infraestructure/inventory-item.repository';
import { createProductUseCase } from '@/product/application/create-product.uc';
import {
  CreateProductBody,
  CreateProductBodySchema,
} from '@/product/domain/product.entity';
import { ProductRepository } from '@/product/infrastructure/product.repository';
import { ResponseCode } from '@/shared/_common/constants/response-codes';
import { dbConnect } from 'lib/mongoose/connect';
import { session } from 'lib/nextauth/session.server';

const itemsRepository = new InventoryItemRepository();
const productRepository = new ProductRepository();

export const createProduct = async (body: CreateProductBody) => {
  const user = await session();
  if (user.status === 'unauthenticated') return user.error;

  const { data } = CreateProductBodySchema.safeParse(body);
  if (!data) {
    return {
      ...ResponseCode['BAD REQUEST'],
      message: 'Formato inválido',
    };
  }

  await dbConnect();
  const _createProduct = createProductUseCase(
    productRepository,
    itemsRepository
  );
  const result = await _createProduct(data, user.data.id);
  return result;
};
