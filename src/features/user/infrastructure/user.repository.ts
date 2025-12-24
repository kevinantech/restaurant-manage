import { InsertUser, User } from '../domain/user.entity';
import { IUserRepository } from '../domain/user.repository.interface';
import { userModel } from './user.model';

export class UserRepository implements IUserRepository {
  async getUserByEmail(email: string): Promise<User | undefined> {
    const doc = await userModel.findOne({ email });
    return doc
      ? {
          id: doc.id,
          name: doc.name,
          role: doc.role,
          email: doc.email,
          password: doc.password,
        }
      : undefined;
  }
  async saveUser(body: InsertUser): Promise<void> {
    await new userModel(body).save();
  }
}
