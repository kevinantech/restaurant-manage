import {
  InsertInventoryItem,
  InventoryItem,
} from '../domain/inventory-item.entity';
import { IInventoryRepository } from '../domain/inventory.repository.interface';
import { InventoryItemModel } from './inventory-item.model';

export class InventoryItemRepository implements IInventoryRepository {
  async getItemById(id: string): Promise<InventoryItem | undefined> {
    const doc = await InventoryItemModel.findById(id);
    return doc
      ? {
          id: doc.id,
          name: doc.name,
          unitOfMeasure: doc.unitOfMeasure,
          unitPrice: doc.unitPrice,
          stock: doc.stock,
          userId: doc.userId,
        }
      : undefined;
  }

  async createItem(body: InsertInventoryItem): Promise<void> {
    await new InventoryItemModel(body).save();
  }
  async updateItem(
    id: string,
    payload: Partial<
      Pick<InventoryItem, 'name' | 'unitOfMeasure' | 'unitPrice' | 'stock'>
    >
  ): Promise<void> {
    await InventoryItemModel.updateOne({ _id: id }, payload);
  }

  async getItemsForUser(userId: string): Promise<InventoryItem[]> {
    const docs = await InventoryItemModel.find({ userId });
    return docs.map((doc) => ({
      id: doc.id,
      name: doc.name,
      unitOfMeasure: doc.unitOfMeasure,
      unitPrice: doc.unitPrice,
      stock: doc.stock,
      userId: doc.userId,
    }));
  }
}
