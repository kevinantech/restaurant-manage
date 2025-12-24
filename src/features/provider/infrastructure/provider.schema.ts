import { HydratedDocument, model, Model, models, Schema } from 'mongoose';
import { InsertProvider, Provider } from '../domain/provider.entity';
export type ProviderDocument = HydratedDocument<Provider>;
export type providerModel = Model<ProviderDocument>;

const schema = new Schema<InsertProvider>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

export const providerModel: providerModel =
  models.providers || model('providers', schema);
