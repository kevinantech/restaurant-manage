import { z } from 'zod';
import {
  InsertProduct,
  Product,
  ProductSchema,
} from '../domain/product.entity';
import { IProductRepository } from '../domain/product.repository.interface';
import { ProductModel } from './product.model';

const ProductsSchema = z.array(ProductSchema);

export class ProductRepository implements IProductRepository {
  async getProductById(id: string): Promise<Product | undefined> {
    try {
      const doc = await ProductModel.findById(id).lean();
      const { data } = ProductSchema.safeParse({
        id: doc?._id.toString(),
        ...doc,
      });
      return data;
    } catch (e) {
      if (e instanceof Error) console.log(e.message);
    }
  }

  async createProduct(body: Product): Promise<void> {
    try {
      await new ProductModel(body).save();
    } catch (e) {
      if (e instanceof Error) console.log(e.message);
    }
  }

  async updateProduct(
    id: string,
    payload: Partial<
      Pick<InsertProduct, 'name' | 'description' | 'price' | 'recipe'>
    >
  ): Promise<void> {
    try {
      await ProductModel.updateOne({ _id: id }, payload);
    } catch (e) {
      if (e instanceof Error) console.log(e.message);
    }
  }

  async getProductsForUser(userId: string): Promise<Product[]> {
    try {
      const docs = await ProductModel.find({ userId }).lean();
      const _docs = docs.map((doc) => ({ id: doc._id.toString(), ...doc }));
      const { data } = ProductsSchema.safeParse(_docs);
      return data ? data : [];
    } catch (e) {
      if (e instanceof Error) console.log(e.message);
      return [];
    }
  }
}
