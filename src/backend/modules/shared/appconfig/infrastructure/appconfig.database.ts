import { IAppConfig } from "../domain/appconfig.entity";
import { AppConfigRepository, SetupParams } from "../domain/appconfig.repository";
import { AppConfigModel } from "./appconfig.model";

export class AppConfigDatabase implements AppConfigRepository {
  async setup(params: SetupParams): Promise<void> {
    try {
      const doc = new AppConfigModel({
        hidden: {
          "admin-setup": params["admin-setup"],
        },
      } as Omit<IAppConfig, "_id">);
      await doc.save();
    } catch (error) {
      console.error({ at: `${__dirname} => setup()`, error });
    }
  }

  async findOne(): Promise<IAppConfig | undefined> {
    try {
      const doc = await AppConfigModel.findOne();
      return doc;
    } catch (error) {
      console.error({ at: `${__dirname} => setup()`, error });
    }
  }
}
