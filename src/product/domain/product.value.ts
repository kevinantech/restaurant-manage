import { Ingredient, IProduct } from './product.entity';

export class Product implements IProduct {
  id: string;
  name: string;
  description: string;
  ingredients: Ingredient[];
  price: number;
  userId: string;

  constructor(
    id: string,
    name: string,
    description: string,
    ingredients: Ingredient[],
    price: number,
    userId: string
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.ingredients = ingredients;
    this.price = price;
    this.userId = userId;
  }
}
