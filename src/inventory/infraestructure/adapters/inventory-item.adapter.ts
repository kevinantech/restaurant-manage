import { InventoryItem } from '@/inventory/domain/inventory-item.value';

export class InventoryItemAdapter {
  private adaptee: any;
  constructor(adaptee: any) {
    this.adaptee = adaptee;
  }

  request(): InventoryItem {
    return {
      id: this.adaptee.id,
      name: this.adaptee.name,
      category: this.adaptee.category,
      unitOfMeasure: this.adaptee.unitOfMeasure,
      unitWeight: this.adaptee.unitWeight,
      stock: this.adaptee.stock,
      userId: this.adaptee.userId,
    };
  }
}
