import { ISystemUser } from "../../shared/systemuser/domain/systemuser.entity";

export interface AdminRepository {
  findByUsername(username: string): Promise<ISystemUser | undefined>;
  register(userData: ISystemUser): Promise<{ id: string } | undefined>;
}
