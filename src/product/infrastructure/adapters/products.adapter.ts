import { IProduct } from '../../domain/product.entity';
import { ProductAdapter } from './product.adapter';

export class ProductsAdapter {
  private adaptee: any;
  constructor(adaptee: any) {
    this.adaptee = adaptee;
  }

  request(): IProduct[] {
    return (this.adaptee as []).map((p) => new ProductAdapter(p).request());
  }
}
