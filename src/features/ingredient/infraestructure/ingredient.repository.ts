import { InsertIngredient } from '../domain/ingredient.entity';
import { IIngredientRepository } from '../domain/ingredient.repository.interface';
import { ingredientModel } from './ingredient.model';

export class IngredientRepository implements IIngredientRepository {
  async saveIngredient(input: InsertIngredient): Promise<void> {
    await new ingredientModel(input).save();
  }

  /* async getItemById(id: string): Promise<InventoryItem | undefined> {
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

  async getItemsForUser(
    filter: { userId: string },
    page: number,
    limit: number
  ): Promise<InventoryItem[]> {
    const docs = await InventoryItemModel.find(filter)
      .skip((page - 1) * limit)
      .limit(limit);

    return docs.map((doc) => ({
      id: doc.id,
      name: doc.name,
      unitOfMeasure: doc.unitOfMeasure,
      unitPrice: doc.unitPrice,
      stock: doc.stock,
      userId: doc.userId,
    }));
  }

  async getTotalItemsForUser(filter: { userId: string }): Promise<number> {
    return InventoryItemModel.countDocuments(filter);
  } */
}
