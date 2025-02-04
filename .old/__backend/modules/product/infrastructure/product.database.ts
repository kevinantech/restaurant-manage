import { IProduct } from "../domain/product.entity";
import { ProductRepository } from "../domain/product.repository";
import { ProductAdapter } from "./adapters/product.adapter";
import { ProductModel } from "./product.model";

export class ProductDatabase implements ProductRepository {
  async findById(id: string): Promise<IProduct | null> {
    const doc = await ProductModel.findOne({ id });
    return new ProductAdapter(doc).requestOne();
  }

  async save(product: IProduct): Promise<void> {
    console.log("🚀 ~ ProductDatabase ~ save ~ product:", product);
    const docRef = new ProductModel(product);
    await docRef.save();
  }

  async update(
    id: string,
    payload: Partial<Omit<IProduct, "id">>
  ): Promise<void> {
    await ProductModel.updateOne({ id }, payload);
  }

  async findAll(): Promise<IProduct[]> {
    const docs = await ProductModel.find();
    return new ProductAdapter(docs).request();
  }
}
