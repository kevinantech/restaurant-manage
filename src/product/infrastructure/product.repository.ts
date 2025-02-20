import { InsertProduct, Product } from '../domain/product.entity';
import { IProductRepository } from '../domain/product.repository.interface';
import { ProductModel } from './product.model';

export class ProductRepository implements IProductRepository {
  async getProductById(id: string): Promise<Product | undefined> {
    const doc = await ProductModel.findById(id);
    return doc
      ? {
          id: doc.id,
          name: doc.name,
          description: doc.description,
          recipe: doc.recipe,
          price: doc.price,
          userId: doc.userId,
        }
      : undefined;
  }

  async createProduct(body: Product): Promise<void> {
    await new ProductModel(body).save();
  }

  async updateProduct(
    id: string,
    payload: Partial<
      Pick<InsertProduct, 'name' | 'description' | 'price' | 'recipe'>
    >
  ): Promise<void> {
    await ProductModel.updateOne({ _id: id }, payload);
  }

  async getProductsForUser(userId: string): Promise<Product[]> {
    const docs = await ProductModel.find({ userId });
    return docs.map((doc) => ({
      id: doc.id,
      name: doc.name,
      description: doc.description,
      recipe: doc.recipe,
      price: doc.price,
      userId: doc.userId,
    }));
  }
}
