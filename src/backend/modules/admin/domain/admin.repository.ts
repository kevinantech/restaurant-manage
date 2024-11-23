import { ISystemUser } from "../../shared/systemuser/domain/systemuser.entity";
import { IAdminSetup } from "./admin-setup.entity";

export type SystemUserInput = Omit<ISystemUser, "_id">;
export type AdminSetupPayload = Omit<IAdminSetup, "_id">;

export interface AdminRepository {
  findByUsername(username: string): Promise<ISystemUser | undefined>;
  register(userData: SystemUserInput): Promise<{ _id: string } | undefined>;
  findSetup(): Promise<IAdminSetup[] | undefined>;
  registerSetup(payload: Omit<IAdminSetup, "_id">): Promise<{ _id: string } | undefined>;
}
