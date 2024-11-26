import { ISystemUser } from "../../shared/systemuser/domain/systemuser.entity";

export type SystemUserInput = Omit<ISystemUser, "_id">;

export interface AdminRepository {
  findByUsername(username: string): Promise<ISystemUser | undefined>;
  register(userData: SystemUserInput): Promise<{ _id: string } | undefined>;
}
