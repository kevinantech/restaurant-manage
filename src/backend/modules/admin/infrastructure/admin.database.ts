import { ISystemUser } from "../../shared/systemuser/domain/systemuser.entity";
import { AdminRepository } from "../domain/admin.repository";
import { AdminModel } from "./admin.model";

export class AdminDatabase implements AdminRepository {
  async findByUsername(username: string): Promise<ISystemUser | undefined> {
    try {
      const doc = await AdminModel.findOne({ username });
      return doc;
    } catch (e) {
      console.error({
        at: `${__dirname} => AdminDatabase.findOne()`,
        error: e,
      });
    }
  }
  async register(userData: ISystemUser): Promise<{ id: string } | undefined> {
    try {
      const doc = new AdminModel(userData);
      await doc.save();
      return { id: doc.id };
    } catch (e) {
      console.error({
        at: `${__dirname} => AdminDatabase.register()`,
        error: e,
      });
    }
  }
}
