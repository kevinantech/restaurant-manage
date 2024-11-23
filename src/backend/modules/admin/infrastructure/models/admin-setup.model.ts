import { model, models, Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { IAdminSetup } from "../../domain/admin-setup.entity";

const AdminSetupSchema = new Schema<IAdminSetup>(
  {
    _id: {
      type: String,
      default: uuidv4,
    },
    adminId: {
      type: String,
      required: true,
    },
    established: {
      type: Boolean,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

/* Fixs: ⨯ OverwriteModelError: Cannot overwrite `AdminSetup` model once compiled. */
const AdminSetupModel = models.AdminSetup || model("AdminSetup", AdminSetupSchema);
export { AdminSetupModel };
