import { IProduct } from '../../domain/product.entity';

export class ProductAdapter {
  private adaptee: any;
  constructor(adaptee: any) {
    this.adaptee = adaptee;
  }

  request(): IProduct {
    return {
      id: this.adaptee.id,
      name: this.adaptee.name,
      description: this.adaptee.description,
      ingredients: this.adaptee.ingredients,
      price: this.adaptee.price,
      userId: this.adaptee.userId,
    };
  }
}
