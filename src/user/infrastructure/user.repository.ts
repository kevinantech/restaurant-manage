import { InsertUser, User } from '../domain/user.entity';
import { IUserRepository } from '../domain/user.repository.interface';
import { UserModel } from './user.model';

export class UserRepository implements IUserRepository {
  async getUserByEmail(email: string): Promise<User | undefined> {
    const doc = await UserModel.findOne({ email });
    return doc
      ? {
          id: doc.id,
          name: doc.name,
          email: doc.email,
          role: doc.role,
          password: doc.password,
        }
      : undefined;
  }
  async saveUser(body: InsertUser): Promise<void> {
    await new UserModel(body).save();
  }
}
