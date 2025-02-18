import {
  Model,
  model,
  models,
  Schema,
  SchemaDefinitionProperty,
} from 'mongoose';
import { InsertProduct, ProductRecipe } from '../domain/product.entity';

const ProductSchema = new Schema<InsertProduct>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    recipe: {
      type: [
        {
          id: {
            type: String,
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
          },
        } as Record<keyof ProductRecipe, SchemaDefinitionProperty>,
      ],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

/* Fixs: ⨯ OverwriteModelError: Cannot overwrite `Products` model once compiled. */
const ProductModel: Model<InsertProduct> =
  models?.products || model('products', ProductSchema);
export { ProductModel };
