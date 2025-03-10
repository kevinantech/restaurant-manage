import { InsertProduct, Product } from './product.entity';

export interface IProductRepository {
  getProductsForUser(
    filter: { userId: string },
    page: number,
    limit: number
  ): Promise<Product[]>;

  getTotalProductsForUser(filter: { userId: string }): Promise<number>;

  getProductById(id: string): Promise<Product | undefined>;

  createProduct(body: InsertProduct): Promise<void>;

  updateProduct(
    id: string,
    payload: Partial<
      Pick<InsertProduct, 'name' | 'description' | 'price' | 'recipe'>
    >
  ): Promise<void>;
}
