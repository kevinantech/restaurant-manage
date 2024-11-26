import { model, models, Schema } from "mongoose";
import { IAppConfig } from "../domain/appconfig.entity";
import { v4 as uuidv4 } from "uuid";

const AppConfigSchema = new Schema<IAppConfig>(
  {
    _id: {
      type: String,
      default: uuidv4,
    },
    hidden: {
      ["admin-setup"]: {
        type: Boolean,
        required: true,
      },
    },
  },
  { versionKey: false }
);

const AppConfigModel = models.AppConfig || model("AppConfig", AppConfigSchema);
export { AppConfigModel };
