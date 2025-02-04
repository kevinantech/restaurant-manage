import { model, models, Schema, SchemaDefinitionProperty } from "mongoose";
import { Ingredient, IProduct } from "../domain/product.entity";

const ProductSchema = new Schema<IProduct>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    ingredients: {
      type: [
        {
          inventoryItemId: {
            type: String,
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
          },
        } as Record<keyof Ingredient, SchemaDefinitionProperty>,
      ],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

/* Fixs: ⨯ OverwriteModelError: Cannot overwrite `Products` model once compiled. */
const ProductModel = models.Products || model("Products", ProductSchema);
export { ProductModel };
