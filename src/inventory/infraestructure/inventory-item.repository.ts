import { z } from 'zod';
import {
  InsertInventoryItem,
  InventoryItem,
  InventoryItemSchema,
} from '../domain/inventory-item.entity';
import { IInventoryRepository } from '../domain/inventory.repository.interface';
import { InventoryItemModel } from './inventory-item.model';

const InventoryItemsSchema = z.array(InventoryItemSchema);

export class InventoryItemRepository implements IInventoryRepository {
  async getItemById(id: string): Promise<InventoryItem | undefined> {
    try {
      const doc = await InventoryItemModel.findById(id).lean();
      const { data } = InventoryItemSchema.safeParse({
        id: doc?._id.toString(),
        ...doc,
      });

      return data;
    } catch (e) {
      if (e instanceof Error) console.log(e.message);
    }
  }

  async createItem(body: InsertInventoryItem): Promise<void> {
    try {
      await new InventoryItemModel(body).save();
    } catch (e) {
      if (e instanceof Error) console.log(e.message);
    }
  }
  async updateItem(
    id: string,
    payload: Partial<
      Pick<InventoryItem, 'name' | 'unitOfMeasure' | 'unitPrice' | 'stock'>
    >
  ): Promise<void> {
    try {
      await InventoryItemModel.updateOne({ _id: id }, payload);
    } catch (e) {
      if (e instanceof Error) console.log(e.message);
    }
  }

  async getItemsForUser(userId: string): Promise<InventoryItem[]> {
    try {
      const docs = await InventoryItemModel.find({ userId }).lean();
      const _docs = docs.map((doc) => ({ id: doc._id.toString(), ...doc }));
      const { data } = InventoryItemsSchema.safeParse(_docs);
      return data ? data : [];
    } catch (e) {
      if (e instanceof Error) console.log(e.message);
      return [];
    }
  }
}
