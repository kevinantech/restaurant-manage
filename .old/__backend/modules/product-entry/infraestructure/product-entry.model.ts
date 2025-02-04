import { model, models, Schema } from "mongoose";
import { IProductEntry } from "../domain/product-entry.entity";
import { Units } from "@/backend/common/constants/units-enum";

const ProductEntrySchema = new Schema<IProductEntry>(
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
    category: {
      type: String,
      required: true,
    },
    unitOfMeasure: {
      type: String,
      default: Units.DEFAULT,
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
  }
);

/* Fixs: ⨯ OverwriteModelError: Cannot overwrite `InventoryItems` model once compiled. */
const ProductEntryModel =
  models.ProductEntries || model("ProductEntries", ProductEntrySchema);
export { ProductEntryModel };
