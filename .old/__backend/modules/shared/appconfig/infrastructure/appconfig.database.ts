import { IAppConfig } from "../domain/appconfig.entity";
import { AppConfigRepository } from "../domain/appconfig.repository";
import { AppConfigModel } from "./appconfig.model";

export class AppConfigDatabase implements AppConfigRepository {
  async setup(isAdminSetup: boolean): Promise<void> {
    try {
      const doc = new AppConfigModel({
        isAdminSetup,
      } as Omit<IAppConfig, "_id">);
      await doc.save();
    } catch (error) {
      console.error({ at: `${__dirname} => setup()`, error });
    }
  }

  async findOne(): Promise<IAppConfig | null> {
    try {
      const doc = await AppConfigModel.findOne();
      return doc ? doc : null;
    } catch (error) {
      console.error({ at: `${__dirname} => findOne()`, error });
      return null;
    }
  }
}
