'use server';
import { RegisterAdminDto } from '@/admin/application/dto/register-admin.dto';
import { RegisterAdmin } from '@/admin/application/register-admin.uc';
import { AdminDatabase } from '@/admin/infrastructure/admin.database';
import { CreateInventoryItem } from '@/inventory/application/create-inventory-item.uc';
import { CreateInventoryItemDto } from '@/inventory/application/dto/create-inventory-item.dto';
import { InventoryItemDatabase } from '@/inventory/infraestructure/inventory-item.database';
import { connectDB } from 'lib/mongoose/connect';
import { session } from 'lib/nextauth/session.server';
import { findFormatError } from '../utils/helpers/validation.helper';
import { FormType as CreateInventoryItemFormType } from './(admin)/app/inventory/add/page';

const adminRepository = new AdminDatabase();
const inventoryItemRepository = new InventoryItemDatabase();

export const registerAdmin = async (input: RegisterAdminDto) => {
  const formatError = await findFormatError(RegisterAdminDto, input);
  if (formatError) return formatError;

  await connectDB();
  const result = await new RegisterAdmin(new AdminDatabase()).register(input);
  return result;
};

export const registerInventoryItem = async (
  input: CreateInventoryItemFormType
) => {
  const user = await session();
  if (user.status === 'unauthenticated') return user.error;

  const _input: CreateInventoryItemDto = { ...input, userId: user.data.id };

  const formatError = await findFormatError(CreateInventoryItemDto, _input);
  if (formatError) return formatError;

  await connectDB();

  const result = await new CreateInventoryItem(
    adminRepository,
    inventoryItemRepository
  ).create(_input);

  return result;
};
