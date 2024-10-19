import { ResponseCode, secret } from "@/backend/common/constants";
import { IResponseBase } from "@/backend/common/entity/response-base.model";
import { IAdminRepository } from "../domain/admin.repository";
import JWT from "jsonwebtoken";

export type AuthAdminData = {
  token: string;
};

export class AdminUC {
  constructor(private readonly adminRepository: IAdminRepository) {}

  async auth(uid: string): Promise<IResponseBase<AuthAdminData>> {
    try {
      const userRecord = await this.adminRepository.getUser(uid);
      if (!userRecord.customClaims || !userRecord.customClaims.admin)
        return {
          ...ResponseCode.UNAUTHORIZED,
          message: "Correo y/o contraseña incorrecta.",
        };

      return {
        ...ResponseCode.OK,
        message: "Autenticación hecha correctamente.",
        data: {
          token: JWT.sign({ uid }, secret, { expiresIn: "30d" }),
        },
      };
    } catch (error) {
      return {
        ...ResponseCode.UNAUTHORIZED,
        message: "Correo y/o contraseña incorrecta.",
      };
    }
  }
}
