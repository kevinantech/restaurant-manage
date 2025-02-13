import { IProduct } from '../domain/product.entity';
import { ProductRepository } from '../domain/product.repository';
import { ProductAdapter } from './adapters/product.adapter';
import { ProductsAdapter } from './adapters/products.adapter';
import { ProductModel } from './product.model';

export class ProductDatabase implements ProductRepository {
  async findProductById(id: string): Promise<IProduct | null> {
    const doc = await ProductModel.findOne({ id });
    return new ProductAdapter(doc).request();
  }

  async createProduct(product: IProduct): Promise<void> {
    const docRef = new ProductModel(product);
    await docRef.save();
  }

  async updateProduct(
    id: string,
    payload: Partial<Omit<IProduct, 'id' | 'userId'>>
  ): Promise<void> {
    await ProductModel.updateOne({ id }, payload);
  }

  async getProductsByUserId(userId: string): Promise<IProduct[]> {
    const docs = await ProductModel.find({ userId });
    return new ProductsAdapter(docs).request();
  }
}
