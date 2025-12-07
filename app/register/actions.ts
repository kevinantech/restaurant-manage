'use server';
import { registerAdminUseCase } from '@/admin/application/register-admin.uc';
import { RegisterAdminBody, RegisterAdminBodySchema } from '@/admin/domain/admin.entity';
import { AdminRepository } from '@/admin/infrastructure/admin.repository';
import { ActionErrorHandler } from 'lib/handlers/error.handler';
import { ValidationError } from 'lib/errors/validation.error';
import { dbConnect } from 'lib/mongoose/connect';

export const registerAdmin = async (body: RegisterAdminBody) => {
  try {
    const { success } = RegisterAdminBodySchema.safeParse(body);
    if (!success) throw new ValidationError();
    await dbConnect();
    const register = registerAdminUseCase(new AdminRepository());
    return await register(body);
  } catch (error) {
    return new ActionErrorHandler(error).handle();
  }
};
