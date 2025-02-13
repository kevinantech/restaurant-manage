import { Units } from '@/shared/_common/constants/units-enum';
import { IInventoryItem } from './inventory-item.entity';

export class InventoryItem implements IInventoryItem {
  readonly id: string;
  readonly name: string;
  readonly unitOfMeasure: Units;
  readonly unitPrice: number;
  readonly stock: number;
  readonly userId: string;

  constructor(
    id: string,
    name: string,
    unitOfMeasure: Units,
    unitPrice: number,
    stock: number,
    userId: string
  ) {
    this.id = id;
    this.name = name;
    this.unitOfMeasure = unitOfMeasure;
    this.unitPrice = unitPrice;
    this.stock = stock;
    this.userId = userId;
  }
}
