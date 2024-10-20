import { IProduct } from "./product.entity";

export interface IProductRepository {
  registerProduct(product: IProduct): Promise<IProduct | null>;
}
