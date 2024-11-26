import { IAppConfig } from "./appconfig.entity";

export type SetupParams = {
  ["admin-setup"]: boolean;
};

export interface AppConfigRepository {
  setup(params: SetupParams): Promise<void>;
  findOne(): Promise<IAppConfig | undefined>;
}
