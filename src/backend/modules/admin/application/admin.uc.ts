import { ResponseCode } from "@/backend/common/constants";
import { IResponseBase } from "@/backend/common/entity/response-base.model";
import { GeneralUtils } from "@/backend/common/utils/general.util";
import { AdminRepository } from "../domain/admin.repository";
import { Admin } from "../domain/admin.value";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UserRole } from "@/backend/common/constants/user-roles-enum";

export class AdminUseCase {
  constructor(private readonly adminRepository: AdminRepository) {}

  async create(
    administratorsData: CreateAdminDto
  ): Promise<IResponseBase<{ sessionToken: string }>> {
    try {
      if (administratorsData.password !== administratorsData.confirmPassword)
        return {
          ...ResponseCode["BAD REQUEST"],
          message: "Las contraseñas no coinciden.",
        };

      const docData = await this.adminRepository.findByUsername(administratorsData.username);
      if (docData)
        return {
          ...ResponseCode["BAD REQUEST"],
          message: "El nombre de usuario no está disponible.",
        };

      const KEY = <string>process.env.PASS_ENCRIPTION_KEY;
      const password = await GeneralUtils.encryptPassword(administratorsData.password, KEY);
      const val = new Admin(administratorsData.name, administratorsData.username, password);
      const recovery = await this.adminRepository.register(val);

      if (!recovery)
        return {
          ...ResponseCode["INTERNAL SERVER ERROR"],
          message: "¡Ups! Algo salió mal al guardar tu información",
        };

      const sessionToken = GeneralUtils.generateToken(
        { id: recovery._id },
        UserRole.ADMIN,
        <string>process.env.TOKEN_KEY
      );
      return {
        ...ResponseCode.OK,
        data: { sessionToken },
        message: "Administrador agregado correctamente.",
      };
    } catch (error: any) {
      return {
        ...ResponseCode["INTERNAL SERVER ERROR"],
        message: error.message,
      };
    }
  }
}
