import { InsertInventoryItem, InventoryItem } from './inventory-item.entity';

export interface IInventoryRepository {
  getItemsForUser(userId: string): Promise<InventoryItem[]>;

  getItemById(id: string): Promise<InventoryItem | undefined>;

  createItem(body: InsertInventoryItem): Promise<void>;

  updateItem(
    id: string,
    payload: Partial<
      Pick<InventoryItem, 'name' | 'unitOfMeasure' | 'unitPrice' | 'stock'>
    >
  ): Promise<void>;
}
