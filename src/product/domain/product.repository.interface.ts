import { IProduct } from './product.entity';

export interface IProductRepository {
  getProductsForUser(userId: string): Promise<IProduct[]>;

  getProductByIdForUser(id: string, userId: string): Promise<IProduct | null>;

  createProduct(product: IProduct): Promise<void>;

  updateProduct(
    id: string,
    payload: Partial<Omit<IProduct, 'id' | 'userId'>>
  ): Promise<void>;
}
