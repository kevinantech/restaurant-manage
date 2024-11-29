import { IProductEntry } from "../domain/product-entry.entity";
import { ProductEntryRepository } from "../domain/product-entry.repository";
import { ProductEntryAdapter } from "./adapters/product-entry.adapter";
import { ProductEntryModel } from "./product-entry.model";

export class ProductEntryDatabase implements ProductEntryRepository {
  async findById(id: string): Promise<IProductEntry | null> {
    return await ProductEntryModel.findOne({ id });
  }

  async save(productEntry: IProductEntry): Promise<void> {
    const docRef = new ProductEntryModel(productEntry);
    await docRef.save();
  }

  async update(
    id: string,
    payload: Partial<Omit<IProductEntry, "id">>
  ): Promise<void> {
    await ProductEntryModel.updateOne({ id }, payload);
  }

  async findAll(): Promise<IProductEntry[]> {
    const docs = await ProductEntryModel.find();
    return new ProductEntryAdapter(docs).request();
  }
}
