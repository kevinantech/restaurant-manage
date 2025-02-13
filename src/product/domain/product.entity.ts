export interface IProduct {
  id: string;
  name: string;
  ingredients: Ingredient[];
  description?: string;
  price: number;
  userId: string;
}

export interface Ingredient {
  id: string;
  quantity: number;
}
