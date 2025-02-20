import { Admin, InsertAdmin } from '../domain/admin.entity';
import { IAdminRepository } from '../domain/admin.repository.interface';
import { AdminModel } from './admin.model';

export class AdminRepository implements IAdminRepository {
  async getAdminByUsername(username: string): Promise<Admin | undefined> {
    const doc = await AdminModel.findOne({ username });
    return doc
      ? {
          id: doc.id,
          name: doc.name,
          email: doc.username,
          username: doc.username,
          password: doc.password,
        }
      : undefined;
  }
  async createAdmin(body: InsertAdmin): Promise<void> {
    await new AdminModel(body).save();
  }
}
