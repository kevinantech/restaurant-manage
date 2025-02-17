'use server';
/* import { RegisterAdminDto } from '@/admin/application/dto/register-admin.dto';
import { RegisterAdmin } from '@/admin/application/register-admin.uc';
import { AdminRepository } from '@/admin/infrastructure/admin.database';
import { CreateInventoryItem } from '@/inventory/application/create-inventory-item.uc';
import { CreateInventoryItemDto } from '@/inventory/application/dto/create-inventory-item.dto';
import { InventoryItemDatabase } from '@/inventory/infraestructure/inventory-item.database';
import { CreateProduct } from '@/product/application/create-product.uc';
import { CreateProductDto } from '@/product/application/dto/create-product.dto';
import { ProductDatabase } from '@/product/infrastructure/product.database';
import { connectDB } from 'lib/mongoose/connect';
import { session } from 'lib/nextauth/session.server';
import { findFormatError } from '../utils/helpers/validation.helper';
import { FormType as CreateInventoryItemFormType } from './(admin)/app/inventory/add/page';
import { FormType as RegisterProductFormType } from './(admin)/app/products/add/page';

const userRepository = new AdminRepository();
const productRepository = new ProductDatabase();
const inventoryItemRepository = new InventoryItemDatabase();



export const createInventoryItem = async (
  input: CreateInventoryItemFormType
) => {
  const user = await session();
  if (user.status === 'unauthenticated') return user.error;

  const _input: CreateInventoryItemDto = { ...input, userId: user.data.id };

  const formatError = await findFormatError(CreateInventoryItemDto, _input);
  if (formatError) return formatError;

  await connectDB();

  const result = await new CreateInventoryItem(
    userRepository,
    inventoryItemRepository
  ).create(_input);

  return result;
};

export const registerProduct = async (input: RegisterProductFormType) => {
  const user = await session();
  if (user.status === 'unauthenticated') return user.error;

  const _input: CreateProductDto = { ...input, userId: user.data.id };

  const formatError = await findFormatError(CreateProductDto, _input);
  if (formatError) return formatError;

  await connectDB();

  const result = await new CreateProduct(
    productRepository,
    inventoryItemRepository,
    userRepository
  ).create(_input);

  return result;
}; */
