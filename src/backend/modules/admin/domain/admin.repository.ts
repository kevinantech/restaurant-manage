import { UserRecord } from "firebase-admin/auth";

export interface IAdminRepository {
  getUser(uid: string): Promise<UserRecord>;
}
