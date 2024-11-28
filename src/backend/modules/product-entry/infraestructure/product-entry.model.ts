import { model, models, Schema } from "mongoose";
import { IProductEntry } from "../domain/product-entry.entity";

const ProductEntrySchema = new Schema<IProductEntry>(
  {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    unitOfMeasure: {
      type: String,
      required: true,
    },
    unitWeight: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
    _id: false,
  }
);

/* Fixs: ⨯ OverwriteModelError: Cannot overwrite `Products` model once compiled. */
const ProductEntryModel = models.ProductEntries || model("ProductEntries", ProductEntrySchema);
export { ProductEntryModel };
