import { HydratedDocument, Model, model, models, Schema } from 'mongoose';
import { InsertUser, User } from '../domain/user.entity';
import { UserRole } from '@/shared/enums/user-role-enum';

export type UserDocument = HydratedDocument<User>;
export type UserModel = Model<UserDocument>;

const userSchema = new Schema<InsertUser>(
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
      enum: UserRole,
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
export const userModel: UserModel = models?.users || model('users', userSchema);
