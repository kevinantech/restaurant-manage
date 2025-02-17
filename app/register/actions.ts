'use server';
import { registerAdminUseCase } from '@/admin/application/register-admin.uc';
import {
  RegisterAdminBody,
  RegisterAdminBodySchema,
} from '@/admin/domain/admin.entity';
import { AdminRepository } from '@/admin/infrastructure/admin.repository';
import { ResponseCode } from '@/shared/_common/constants/response-codes';
import { connectDB } from 'lib/mongoose/connect';

const adminRepository = new AdminRepository();

export const registerAdmin = async (body: RegisterAdminBody) => {
  const { data } = RegisterAdminBodySchema.safeParse(body);
  if (!data)
    return {
      ...ResponseCode['BAD REQUEST'],
      message: 'Formato inválido',
    };

  const _registerAdminUseCase = registerAdminUseCase(adminRepository);

  await connectDB();
  const result = await _registerAdminUseCase(body);
  return result;
};
