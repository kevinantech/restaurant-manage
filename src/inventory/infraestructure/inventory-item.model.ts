import { Units } from '@/shared/_common/constants/units-enum';
import { Model, model, models, Schema } from 'mongoose';
import { InsertInventoryItem } from '../domain/inventory-item.entity';

const InventoryItemSchema = new Schema<InsertInventoryItem>(
  {
    name: {
      type: String,
      required: true,
    },
    unitOfMeasure: {
      type: String,
      default: Units.DEFAULT,
    },
    unitPrice: {
      type: Number,
      required: true,
    },
    stock: {
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

/* Fixs: ⨯ OverwriteModelError: Cannot overwrite `InventoryItems` model once compiled. */
const InventoryItemModel: Model<InsertInventoryItem> =
  models?.inventory_items || model('inventory_items', InventoryItemSchema);
export { InventoryItemModel };
