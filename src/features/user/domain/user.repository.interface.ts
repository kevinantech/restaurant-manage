import { InsertUser, User } from './user.entity';

export interface IUserRepository {
  saveUser(body: InsertUser): Promise<void>;
  getUserByEmail(email: string): Promise<User | undefined>;
}
