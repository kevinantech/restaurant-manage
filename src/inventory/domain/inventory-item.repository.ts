import { IInventoryItem } from './inventory-item.entity';

export interface InventoryItemRepository {
  getItem(id: string): Promise<IInventoryItem | null>;

  createItem(item: IInventoryItem): Promise<void>;

  updateItem(
    id: string,
    payload: Partial<
      Pick<IInventoryItem, 'name' | 'unitOfMeasure' | 'unitPrice' | 'stock'>
    >
  ): Promise<void>;

  getItemsForUser(userId: string): Promise<IInventoryItem[]>;
}
