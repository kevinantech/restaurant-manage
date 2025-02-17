import { z } from 'zod';

export type Order = z.infer<typeof order>;
export type OrderItem = z.infer<typeof orderItem>;
export type OrderItemBody = z.infer<typeof orderItemBody>;
export type CreateOrderBody = z.infer<typeof createOrderBody>;

export const orderItem = z.object({
  productId: z.string(),
  productPrice: z.number().positive(),
  quantity: z.number().int().positive(),
});

export const order = z.object({
  id: z.string(),
  items: z.array(orderItem).min(1).max(20),
  totalAmount: z.number().positive(),
  date: z.date(),
  organizationId: z.string(),
});

export const orderItemBody = z.object({
  productId: z.string().min(1, 'Ingrese un producto'),
  quantity: z.number().int().min(1, 'Ingrese la cantidad del producto'),
});

export const createOrderBody = z.object({
  items: z.array(orderItemBody).min(1).max(20),
});
