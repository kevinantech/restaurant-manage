import { ISystemUser } from './systemuser.entity';

export interface SystemUserRepository {
  findUserById(id: string): Promise<ISystemUser | undefined>;
  findByUsername(username: string): Promise<ISystemUser | undefined>;
  registerUser(userData: ISystemUser): Promise<{ id: string } | undefined>;
}
