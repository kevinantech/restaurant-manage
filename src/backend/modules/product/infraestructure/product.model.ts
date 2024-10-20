import { model, models, Schema } from "mongoose";
import { IProduct } from "../domain/product.entity";

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
    price: {
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
