import { model, models, Schema } from 'mongoose';
import { IInventoryItem } from '../domain/inventory-item.entity';
import { Units } from '@/shared/_common/constants/units-enum';

const InventoryItemSchema = new Schema<IInventoryItem>(
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
const InventoryItemModel =
  models.inventory_items || model('inventory_items', InventoryItemSchema);
export { InventoryItemModel };
