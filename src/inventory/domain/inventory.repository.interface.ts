import { InsertInventoryItem, InventoryItem } from './inventory-item.entity';

export interface IInventoryRepository {
  getItemsForUser(userId: string): Promise<InventoryItem[]>;

  getItemByIdForUser(
    id: string,
    userId: string
  ): Promise<InventoryItem | undefined>;

  createItem(body: InsertInventoryItem): Promise<void>;

  updateItemForUser(
    id: string,
    payload: Partial<
      Pick<InventoryItem, 'name' | 'unitOfMeasure' | 'unitPrice' | 'stock'>
    >,
    userId: string
  ): Promise<void>;
}
