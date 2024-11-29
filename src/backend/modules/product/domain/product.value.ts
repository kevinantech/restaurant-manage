import { Ingredient, IProduct } from "./product.entity";

export class Product implements IProduct {
  id: string;
  name: string;
  description: string;
  ingredients: Ingredient[];
  price: number;

  constructor(
    id: string,
    name: string,
    description: string,
    ingredients: Ingredient[],
    price: number
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.ingredients = ingredients;
    this.price = price;
  }
}
