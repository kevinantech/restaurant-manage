import { model, models, Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { ISystemUser } from "../../../shared/systemuser/domain/systemuser.entity";

const AdminSchema = new Schema<ISystemUser>(
  {
    _id: {
      type: String,
      default: uuidv4,
    },
    username: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

/* Fixs: ⨯ OverwriteModelError: Cannot overwrite `Admins` model once compiled. */
const AdminModel = models.Admins || model("Admins", AdminSchema);
export { AdminModel };
