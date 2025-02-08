import { IInventoryItem } from '../domain/inventory-item.entity';
import { InventoryItemRepository } from '../domain/inventory-item.repository';
import { InventoryItemsAdapter } from './adapters/inventory-items.adapter';
import { InventoryItemModel } from './inventory-item.model';

export class InventoryItemDatabase implements InventoryItemRepository {
  async findItemById(id: string): Promise<IInventoryItem | null> {
    return await InventoryItemModel.findOne({ id });
  }

  async createItem(item: IInventoryItem): Promise<void> {
    const docRef = new InventoryItemModel(item);
    await docRef.save();
  }

  async updateItem(
    id: string,
    payload: Partial<Omit<IInventoryItem, 'id' | 'userId'>>
  ): Promise<void> {
    await InventoryItemModel.updateOne({ id }, payload);
  }

  async getItemsByUserId(userId: string): Promise<IInventoryItem[]> {
    const docs = await InventoryItemModel.find({ userId });
    return new InventoryItemsAdapter(docs).request();
  }
}
