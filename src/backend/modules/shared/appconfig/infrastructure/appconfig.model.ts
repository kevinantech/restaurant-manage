"use server";
import { model, models, Schema } from "mongoose";
import { IAppConfig } from "../domain/appconfig.entity";
import { v4 as uuidv4 } from "uuid";

const AppConfigSchema = new Schema<IAppConfig>(
  {
    _id: {
      type: String,
      default: uuidv4,
    },
    isAdminSetup: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

/* Fixs: ⨯ OverwriteModelError: Cannot overwrite `AppConfigs` model once compiled. */
const AppConfigModel = models?.AppConfig || model("AppConfigs", AppConfigSchema);
export { AppConfigModel };
