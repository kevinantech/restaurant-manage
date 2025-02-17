import { Admin, AdminSchema, InsertAdmin } from '../domain/admin.entity';
import { IAdminRepository } from '../domain/admin.repository.interface';
import { AdminModel } from './admin.model';

export class AdminRepository implements IAdminRepository {
  async getAdminByUsername(username: string): Promise<Admin | undefined> {
    try {
      const doc = await AdminModel.findOne({ username }).lean();
      const { data, error } = AdminSchema.safeParse({
        id: doc?._id.toString(),
        ...doc,
      });
      return data;
    } catch (e) {
      if (e instanceof Error) console.log(e);
    }
  }
  async createAdmin(body: InsertAdmin): Promise<void> {
    try {
      const doc = new AdminModel(body);
      await doc.save();
    } catch (e) {
      if (e instanceof Error) console.log(e);
    }
  }
}
