import { z } from 'zod';

export type ProductRecipe = z.infer<typeof ProductRecipeSchema>;
export type InsertProduct = z.infer<typeof InsertProductSchema>;
export type Product = z.infer<typeof ProductSchema>;
export type ProductRecipeBody = z.infer<typeof ProductRecipeBodySchema>;
export type CreateProductBody = z.infer<typeof CreateProductBodySchema>;

export const ProductRecipeSchema = z.object({
  id: z.string(),
  quantity: z.number(),
});

export const InsertProductSchema = z.object({
  name: z.string(),
  description: z.string(),
  recipe: z.array(ProductRecipeSchema),
  price: z.number(),
  userId: z.string(),
});

export const ProductSchema = InsertProductSchema.extend({
  id: z.string(),
});

export const ProductRecipeBodySchema = z.object({
  id: z.string().min(1, 'Seleccione un ingrediente'),
  quantity: z.number().positive('Ingrese la cantidad del ingrediente'),
});

export const CreateProductBodySchema = z.object({
  name: z.string().min(1, 'Ingrese el nombre del producto').max(255),
  description: z.string().max(255),
  recipe: z.array(ProductRecipeBodySchema).min(1),
  price: z.number().positive('Ingrese un precio válido'),
});
