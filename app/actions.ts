'use server';
import { RegisterAdminDto } from '@/admin/application/dto/register-admin.dto';
import { RegisterAdmin } from '@/admin/application/register-admin.uc';
import { AdminDatabase } from '@/admin/infrastructure/admin.database';
import { connectDB } from 'lib/mongoose/connect';
import { findFormatError } from '../utils/helpers/validation.helper';

export const registerAdmin = async (input: RegisterAdminDto) => {
  const formatError = await findFormatError(RegisterAdminDto, input);
  if (formatError) return formatError;

  await connectDB();
  const result = await new RegisterAdmin(new AdminDatabase()).register(input);
  return result;
};

export const auth = async () => {};
