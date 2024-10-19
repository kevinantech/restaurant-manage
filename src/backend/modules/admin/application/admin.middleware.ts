import { ECookie, secret } from "@/backend/common/constants";
import { IAdminRepository } from "@/backend/modules/admin/domain/admin.repository";
import JWT, { JwtPayload } from "jsonwebtoken";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";

export class AdminMiddleware {
  constructor(private readonly adminRepository: IAdminRepository) {}

  async validateAuthByCookies(cookies: RequestCookies): Promise<boolean> {
    try {
      const authCookie = cookies.get(ECookie.ADMIN_AUTH_TOKEN);
      if (!authCookie || !authCookie.value) throw new Error("Invalid cookie");
      const { uid } = <JwtPayload & { uid?: string }>JWT.verify(authCookie.value, secret);
      if (!uid) throw new Error("Invalid payload");
      const { customClaims } = await this.adminRepository.getUser(uid);
      if (!customClaims || !customClaims.admin) throw new Error("Invalid claims");
      return true;
    } catch (error) {
      return false;
    }
  }
}
