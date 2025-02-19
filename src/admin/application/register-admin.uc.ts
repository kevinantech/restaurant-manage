import { ResponseCode } from '@/shared/_common/constants/response-codes';
import { GeneralUtils } from 'lib/general.util';
import { RegisterAdminBody } from '../domain/admin.entity';
import { IAdminRepository } from '../domain/admin.repository.interface';
import { IBaseResponse } from '@/shared/entity/base-response';

export type IRegisterAdminUseCase = ReturnType<typeof registerAdminUseCase>;

export const registerAdminUseCase =
  (repository: IAdminRepository) =>
  async (body: RegisterAdminBody): Promise<IBaseResponse> => {
    try {
      const data = await repository.getAdminByUsername(body.username);
      if (data) {
        return {
          ...ResponseCode['BAD REQUEST'],
          message: 'Nombre de usuario no disponible',
        };
      }

      const KEY = <string>process.env.PASS_ENCRIPTION_KEY;
      const password = await GeneralUtils.encryptPassword(body.password, KEY);

      await repository.createAdmin({
        name: body.name,
        email: body.email,
        username: body.username,
        password,
      });

      return {
        ...ResponseCode.OK,
        message: 'Administrador agregado',
      };
    } catch (e) {
      if (e instanceof Error) console.log('Error', e.message);
      return {
        ...ResponseCode['INTERNAL SERVER ERROR'],
        message: 'Unexpected error',
      };
    }
  };
