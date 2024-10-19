import { ProductValue } from "./product.value";

export interface IProductRepository {
  add(product: ProductValue): Promise<{ id: string }>;
  addImages(files: File[]): Promise<string[]>;
}
