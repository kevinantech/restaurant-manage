import { Units } from '@/shared/_common/constants/units-enum';
import { InventoryItemCategory } from './inventory-item-category-enum';

export interface IInventoryItem {
  id: string;
  name: string;
  category: InventoryItemCategory;
  unitOfMeasure: Units;
  unitWeight: number;
  stock: number;
  userId: string;
}
