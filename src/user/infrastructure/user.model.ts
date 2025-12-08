import { Model, model, models, Schema } from 'mongoose';
import { InsertUser } from '../domain/user.entity';

const UserSchema = new Schema<InsertUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    role: {
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

/* Fixs: ⨯ OverwriteModelError: Cannot overwrite `Users` model once compiled. */
const UserModel: Model<InsertUser> = models?.users || model('users', UserSchema);
export { UserModel };
