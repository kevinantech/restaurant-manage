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
      unitOfMeasure: this.adaptee.unitOfMeasure,
      unitPrice: this.adaptee.unitPrice,
      stock: this.adaptee.stock,
      userId: this.adaptee.userId,
    };
  }
}
