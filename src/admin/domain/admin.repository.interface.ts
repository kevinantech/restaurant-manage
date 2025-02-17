import { Admin, InsertAdmin } from './admin.entity';

export interface IAdminRepository {
  createAdmin(body: InsertAdmin): Promise<void>;
  getAdminByUsername(username: string): Promise<Admin | undefined>;
}
