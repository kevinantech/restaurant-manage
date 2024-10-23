import { IProduct } from "../domain/product.entity";
import { IProductRepository } from "../domain/product.repository";
import { ProductModel } from "./product.model";

export class ProductDatabase implements IProductRepository {
  public async register(product: IProduct): Promise<IProduct | null> {
    try {
      const productModel = new ProductModel(product);
      const productSaved = await productModel.save();
      return productSaved;
    } catch (e) {
      console.error({ at: `${__dirname} => registerProduct`, error: e });
    }
    return null;
  }

  public async find(): Promise<IProduct[] | null> {
    const products = await ProductModel.find();
    return products;
  }

  public async findById(id: string): Promise<IProduct | null> {
    const product = await ProductModel.findOne({ id });
    return product;
  }

  public async update(
    id: string,
    payload: Partial<Omit<IProduct, "id" | "_id">>
  ): Promise<IProduct | null> {
    await ProductModel.updateOne({ id }, payload);
    const product = ProductModel.findOne({ id });
    return product;
  }
}
