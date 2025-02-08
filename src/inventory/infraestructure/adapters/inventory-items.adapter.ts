import { InventoryItem } from '@/inventory/domain/inventory-item.value';
import { InventoryItemAdapter } from './inventory-item.adapter';

export class InventoryItemsAdapter {
  private adaptee: any;
  constructor(adaptee: any) {
    this.adaptee = adaptee;
  }

  request(): InventoryItem[] {
    return (this.adaptee as []).map((p) =>
      new InventoryItemAdapter(p).request()
    );
  }
}
