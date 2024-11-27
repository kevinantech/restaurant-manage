import { IAppConfig } from "./appconfig.entity";

export interface AppConfigRepository {
  setup(isAdminSetup: boolean): Promise<void>;
  findOne(): Promise<IAppConfig | null>;
}
