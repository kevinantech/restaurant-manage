import { InsertInventoryItem, InventoryItem } from './inventory-item.entity';

export interface IInventoryRepository {
  getItemsForUser(
    filter: { userId: string },
    page: number,
    limit: number
  ): Promise<InventoryItem[]>;

  getTotalItemsForUser(filter: { userId: string }): Promise<number>;

  getItemById(id: string): Promise<InventoryItem | undefined>;

  createItem(body: InsertInventoryItem): Promise<void>;

  updateItem(
    id: string,
    payload: Partial<
      Pick<InventoryItem, 'name' | 'unitOfMeasure' | 'unitPrice' | 'stock'>
    >
  ): Promise<void>;
}
