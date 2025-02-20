import { Units } from '../domain/units-enum';
import { model, models, Schema } from 'mongoose';
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

const _InventoryItemModel = model('inventory_items', InventoryItemSchema);
type InventoryItemModelType = typeof _InventoryItemModel;

/* Fixs: ⨯ OverwriteModelError: Cannot overwrite `InventoryItems` model once compiled. */
const InventoryItemModel: InventoryItemModelType =
  models?.inventory_items || _InventoryItemModel;
export { InventoryItemModel };
