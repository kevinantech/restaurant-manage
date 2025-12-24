'use server';
import { InventoryItemRepository } from '@/inventory/infraestructure/inventory-item.repository';
import { createProductUseCase } from '@/product/application/create-product.uc';
import {
  CreateProductBody,
  CreateProductBodySchema,
} from '@/product/domain/product.entity';
import { ProductRepository } from '@/product/infrastructure/product.repository';
import { AuthenticationError } from 'lib/errors/authentication.error';
import { ValidationError } from 'lib/errors/validation.error';
import { ActionErrorHandler } from 'lib/handlers/error.handler';
import { dbConnect } from 'lib/mongoose/connect';
import { session } from 'lib/next-auth/session.server';

export const createProduct = async (body: CreateProductBody) => {
  try {
    const user = await session();
    if (!user) throw new AuthenticationError();

    const { success } = CreateProductBodySchema.safeParse(body);
    if (!success) throw new ValidationError();

    await dbConnect();
    const _createProduct = createProductUseCase(
      new ProductRepository(),
      new InventoryItemRepository()
    );
    return await _createProduct(body, user.id);
  } catch (error) {
    return new ActionErrorHandler(error).handle();
  }
};
