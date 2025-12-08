import { UserRole } from '@/shared/enums/user-role-enum';
import { ConflictError } from 'lib/errors/conflict.error';
import { GeneralUtils } from 'lib/general.util';
import { ResponseBodyFactory } from 'lib/http/response-body.factory';
import { RegisterAdminBody } from '../domain/admin-user.entity';
import { IUserRepository } from '../domain/user.repository.interface';

export type IRegisterAdminUseCase = ReturnType<typeof registerAdminUseCase>;

export const registerAdminUseCase =
  (repository: IUserRepository) => async (body: RegisterAdminBody) => {
    const data = await repository.getUserByEmail(body.email);
    if (data) throw new ConflictError('Usuario no disponible');

    const KEY = <string>process.env.PASS_ENCRIPTION_KEY;
    const password = await GeneralUtils.encryptPassword(body.password, KEY);

    await repository.saveUser({
      name: body.name,
      email: body.email,
      role: UserRole.SUPER_ADMIN,
      password,
    });

    return ResponseBodyFactory.success({});
  };
