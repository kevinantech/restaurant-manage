import { z } from 'zod';
export type Order = z.infer<typeof OrderSchema>;
export type InsertOrder = z.infer<typeof InsertOrderSchema>;
export type OrderProduct = z.infer<typeof OrderProductSchema>;
export type OrderProductBody = z.infer<typeof OrderProductBodySchema>;
export type CreateOrderBody = z.infer<typeof CreateOrderBodySchema>;
export type OrderWithExtendedProducts = z.infer<
  typeof OrderWithExtendedProductsSchema
>;

export const OrderProductSchema = z.object({
  id: z.string(),
  unitPrice: z.number(),
  quantity: z.number(),
});

export const InsertOrderSchema = z.object({
  products: z.array(OrderProductSchema),
  totalAmount: z.number(),
  userId: z.string(),
  createdAt: z.date(),
});

export const OrderSchema = InsertOrderSchema.extend({
  id: z.string(),
});

export const OrderProductBodySchema = z.object({
  id: z.string().min(1, 'Ingrese un producto'),
  quantity: z.number().int().min(1, 'Ingrese la cantidad del producto'),
});

export const CreateOrderBodySchema = z.object({
  products: z.array(OrderProductBodySchema).min(1).max(20),
});

export const OrderWithExtendedProductsSchema = OrderSchema.extend({
  products: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      quantity: z.number(),
      unitPrice: z.number(),
    })
  ),
});
