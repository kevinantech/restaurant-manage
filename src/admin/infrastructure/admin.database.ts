import { ISystemUser } from '@/shared/systemuser/domain/systemuser.entity';
import { SystemUserRepository } from '@/shared/systemuser/domain/systemuser.repository';
import { AdminModel } from './admin.model';

export class AdminDatabase implements SystemUserRepository {
  async findUserById(id: string): Promise<ISystemUser | undefined> {
    try {
      const doc = await AdminModel.findOne({ id });
      return doc;
    } catch (e) {
      console.error({
        at: `${__dirname} => AdminDatabase.findUserById()`,
        error: e,
      });
    }
  }

  async findByUsername(username: string): Promise<ISystemUser | undefined> {
    try {
      const doc = await AdminModel.findOne({ username });
      return doc;
    } catch (e) {
      console.error({
        at: `${__dirname} => AdminDatabase.findByUsername()`,
        error: e,
      });
    }
  }
  async registerUser(
    userData: ISystemUser
  ): Promise<{ id: string } | undefined> {
    try {
      const doc = new AdminModel(userData);
      await doc.save();
      return { id: doc.id };
    } catch (e) {
      console.error({
        at: `${__dirname} => AdminDatabase.registerUser()`,
        error: e,
      });
    }
  }
}
