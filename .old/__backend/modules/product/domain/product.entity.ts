export interface IProduct {
  id: string; // ID único del producto
  name: string; // Nombre del producto
  ingredients: Ingredient[]; // Ingredientes (insumos) que usa el producto
  description?: string; // Descripción del producto
  price: number; // Precio del producto
}

export interface Ingredient {
  inventoryItemId: string;
  quantity: number;
}
