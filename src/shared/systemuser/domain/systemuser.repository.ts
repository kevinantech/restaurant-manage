import { ISystemUser } from './systemuser.entity';

export interface SystemUserRepository {
  findByUsername(username: string): Promise<ISystemUser | undefined>;
  register(userData: ISystemUser): Promise<{ id: string } | undefined>;
}
