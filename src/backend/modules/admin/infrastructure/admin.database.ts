import { ISystemUser } from "../../shared/systemuser/domain/systemuser.entity";
import { IAdminSetup } from "../domain/admin-setup.entity";
import { AdminRepository, SystemUserInput } from "../domain/admin.repository";
import { AdminSetupModel } from "./models/admin-setup.model";
import { AdminModel } from "./models/admin.model";

export class AdminDatabase implements AdminRepository {
  async findByUsername(username: string): Promise<ISystemUser | undefined> {
    try {
      const doc = await AdminModel.findOne({ username });
      return doc;
    } catch (e) {
      console.error({ at: `${__dirname} => AdminDatabase.register()`, error: e });
    }
  }
  async register(userData: SystemUserInput): Promise<{ _id: string } | undefined> {
    try {
      const doc = new AdminModel(userData);
      await doc.save();
      return { _id: doc._id };
    } catch (e) {
      console.error({ at: `${__dirname} => AdminDatabase.register()`, error: e });
    }
  }
  async findSetup(): Promise<IAdminSetup[] | undefined> {
    try {
      return await AdminSetupModel.find();
    } catch (e) {
      console.error({ at: `${__dirname} => AdminSetupDatabase.findSetup()`, error: e });
    }
  }
  async registerSetup(payload: Omit<IAdminSetup, "_id">): Promise<{ _id: string } | undefined> {
    try {
      const doc = new AdminSetupModel(payload);
      await doc.save();
      return { _id: doc._id };
    } catch (e) {
      console.error({ at: `${__dirname} => AdminSetupDatabase.registerSetup()`, error: e });
    }
  }
}
