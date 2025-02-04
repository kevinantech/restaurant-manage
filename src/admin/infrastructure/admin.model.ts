import { model, models, Schema } from "mongoose";
import { ISystemUser } from "../../shared/systemuser/domain/systemuser.entity";

const AdminSchema = new Schema<ISystemUser>(
  {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    username: {
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
