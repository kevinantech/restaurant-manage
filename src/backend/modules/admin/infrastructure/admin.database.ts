import { FirebaseAdmin } from "@/firebase/firebase-admin";
import { IAdminRepository } from "../domain/admin.repository";

export class AdminDatabase implements IAdminRepository {
  /**
   * https://firebase.google.com/docs/auth/admin/manage-users?authuser=1#retrieve_user_data
   */
  async getUser(uid: string) {
    return await FirebaseAdmin.getInstance().auth.getUser(uid);
  }
}
