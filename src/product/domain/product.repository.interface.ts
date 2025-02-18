import { InsertProduct, Product } from './product.entity';

export interface IProductRepository {
  getProductsForUser(userId: string): Promise<Product[]>;

  getProductById(id: string): Promise<Product | undefined>;

  createProduct(body: InsertProduct): Promise<void>;

  updateProduct(
    id: string,
    payload: Partial<
      Pick<InsertProduct, 'name' | 'description' | 'price' | 'recipe'>
    >
  ): Promise<void>;
}
