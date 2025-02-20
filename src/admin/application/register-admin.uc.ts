import { ConflictError } from 'lib/errors/conflict.error';
import { GeneralUtils } from 'lib/general.util';
import { ResponseBodyFactory } from 'lib/http/response-body.factory';
import { RegisterAdminBody } from '../domain/admin.entity';
import { IAdminRepository } from '../domain/admin.repository.interface';

export type IRegisterAdminUseCase = ReturnType<typeof registerAdminUseCase>;

export const registerAdminUseCase =
  (repository: IAdminRepository) => async (body: RegisterAdminBody) => {
    const data = await repository.getAdminByUsername(body.username);
    if (data) throw new ConflictError('Usuario no disponible');

    const KEY = <string>process.env.PASS_ENCRIPTION_KEY;
    const password = await GeneralUtils.encryptPassword(body.password, KEY);

    await repository.createAdmin({
      name: body.name,
      email: body.email,
      username: body.username,
      password,
    });

    return ResponseBodyFactory.success({});
  };
