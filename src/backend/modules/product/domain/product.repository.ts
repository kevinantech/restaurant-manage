import { IProduct } from "./product.entity";

export interface IProductRepository {
  register(product: IProduct): Promise<IProduct | null>;
  find(): Promise<IProduct[] | null>;
  findById(id: string): Promise<IProduct | null>;
  update(id: string, payload: Partial<Omit<IProduct, "id">>): Promise<IProduct | null>;
}
