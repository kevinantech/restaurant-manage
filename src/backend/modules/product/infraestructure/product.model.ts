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
    quantity: {
      type: Number,
      required: true,
    },
    unitContent: {
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
