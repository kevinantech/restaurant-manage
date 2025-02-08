import { Units } from '@/shared/_common/constants/units-enum';
import { InventoryItemCategory } from './inventory-item-category-enum';
import { IInventoryItem } from './inventory-item.entity';

export class InventoryItem implements IInventoryItem {
  readonly id: string;
  readonly name: string;
  readonly category: InventoryItemCategory;
  readonly unitOfMeasure: Units;
  readonly unitWeight: number;
  readonly stock: number;
  readonly userId: string;

  constructor(
    id: string,
    name: string,
    category: InventoryItemCategory,
    unitOfMeasure: Units,
    unitWeight: number,
    stock: number,
    userId: string
  ) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.unitOfMeasure = unitOfMeasure;
    this.unitWeight = unitWeight;
    this.stock = stock;
    this.userId = userId;
  }
}
