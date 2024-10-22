import { IProduct } from "../domain/product.entity";
import { IProductRepository } from "../domain/product.repository";
import { ProductModel } from "./product.model";

export class ProductDatabase implements IProductRepository {
  public async registerProduct(product: IProduct): Promise<IProduct | null> {
    try {
      const productModel = new ProductModel(product);
      const productSaved = await productModel.save();
      return productSaved;
    } catch (e) {
      console.error({ at: `${__dirname} => registerProduct`, error: e });
    }
    return null;
  }

  public async getProducts(): Promise<IProduct[] | null> {
    const products = ProductModel.find();
    return products;
  }
}
