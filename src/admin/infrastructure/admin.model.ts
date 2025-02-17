import { model, Model, models, Schema } from 'mongoose';
import { InsertAdmin } from '../domain/admin.entity';

const AdminSchema = new Schema<InsertAdmin>(
  {
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
const AdminModel: Model<InsertAdmin> =
  models?.admins || model('admins', AdminSchema);
export { AdminModel };
