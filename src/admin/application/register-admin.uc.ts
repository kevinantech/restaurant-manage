import { ResponseCode } from '@/shared/_common/constants/response-codes';
import { IBaseResponse } from '@/shared/_common/entity/base-response.model';
import { SystemUserRepository } from '@/shared/systemuser/domain/systemuser.repository';
import { GeneralUtils } from 'utils/general.util';
import { Admin } from '../domain/admin.value';
import { RegisterAdminDto } from './dto/register-admin.dto';

export class RegisterAdmin {
  constructor(private readonly userRepository: SystemUserRepository) {}

  async register(userData: RegisterAdminDto): Promise<IBaseResponse> {
    try {
      if (userData.password !== userData.confirmPassword)
        return {
          ...ResponseCode['BAD REQUEST'],
          message: 'Las contraseñas no coinciden.',
        };

      const docData = await this.userRepository.findByUsername(
        userData.username
      );
      if (docData)
        return {
          ...ResponseCode['BAD REQUEST'],
          message: 'El nombre de usuario no está disponible.',
        };

      const KEY = <string>process.env.PASS_ENCRIPTION_KEY;
      const password = await GeneralUtils.encryptPassword(
        userData.password,
        KEY
      );

      const user = new Admin(
        GeneralUtils.generateId(),
        userData.name,
        userData.email,
        userData.username,
        password
      );

      const recovery = await this.userRepository.registerUser(user);

      if (!recovery || !recovery.id)
        return {
          ...ResponseCode['INTERNAL SERVER ERROR'],
          message: '¡Ups! Algo salió mal al guardar tu información',
        };

      return {
        ...ResponseCode.OK,
        message: 'Administrador agregado correctamente.',
      };
    } catch (error: any) {
      return {
        ...ResponseCode['INTERNAL SERVER ERROR'],
        message: error.message,
      };
    }
  }
}
