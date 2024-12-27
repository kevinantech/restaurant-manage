import { ResponseCode } from "@/backend/common/constants";
import { IResponseBase } from "@/backend/common/entity/response-base.model";
import { GeneralUtils } from "@/backend/common/utils/general.util";
import { AppConfigRepository } from "../../shared/appconfig/domain/appconfig.repository";
import { AdminRepository } from "../domain/admin.repository";
import { Admin } from "../domain/admin.value";
import { CreateAdminDto } from "./dto/create-admin.dto";

export class RegisterAdmin {
  constructor(
    private readonly adminRepository: AdminRepository,
    private readonly appConfigRepository: AppConfigRepository
  ) {}

  async register(administratorsData: CreateAdminDto): Promise<IResponseBase> {
    try {
      if (administratorsData.password !== administratorsData.confirmPassword)
        return {
          ...ResponseCode["BAD REQUEST"],
          message: "Las contraseñas no coinciden.",
        };

      const configData = await this.appConfigRepository.findOne();
      if (configData && configData.isAdminSetup)
        return {
          ...ResponseCode["BAD REQUEST"],
          message: "Registro no disponible.",
        };

      const docData = await this.adminRepository.findByUsername(
        administratorsData.username
      );
      if (docData)
        return {
          ...ResponseCode["BAD REQUEST"],
          message: "El nombre de usuario no está disponible.",
        };

      const KEY = <string>process.env.PASS_ENCRIPTION_KEY;
      const password = await GeneralUtils.encryptPassword(
        administratorsData.password,
        KEY
      );
      const val = new Admin(
        GeneralUtils.generateId(),
        administratorsData.name,
        administratorsData.email,
        administratorsData.username,
        password
      );
      const recovery = await this.adminRepository.register(val);

      if (!recovery || !recovery.id)
        return {
          ...ResponseCode["INTERNAL SERVER ERROR"],
          message: "¡Ups! Algo salió mal al guardar tu información",
        };

      await this.appConfigRepository.setup(true);

      return {
        ...ResponseCode.OK,
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
