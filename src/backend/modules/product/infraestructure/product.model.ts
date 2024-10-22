import { model, models, Schema } from "mongoose";
import { IProduct } from "../domain/product.entity";

const ProductSchema = new Schema<IProduct>(
  {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    initialAmount: {
      type: Number,
      required: true,
    },
    currentAmount: {
      type: Number,
      required: true,
    },
    weightPerUnit: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

/* Fixs: ⨯ OverwriteModelError: Cannot overwrite `Products` model once compiled. */
const ProductModel = models.Products || model("Products", ProductSchema);
export { ProductModel };
