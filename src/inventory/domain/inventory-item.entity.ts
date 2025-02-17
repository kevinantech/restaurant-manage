import { Units } from '@/shared/_common/constants/units-enum';
import { z } from 'zod';

export type CreateInventoryItemBody = z.infer<
  typeof CreateInventoryItemBodySchema
>;

export type InventoryItem = z.infer<typeof InventoryItemSchema>;

export type InsertInventoryItem = z.infer<typeof InsertInventoryItemSchema>;

export const InsertInventoryItemSchema = z.object({
  name: z.string(),
  unitOfMeasure: z.nativeEnum(Units),
  unitPrice: z.number(),
  stock: z.number(),
  userId: z.string(),
});

export const InventoryItemSchema = InsertInventoryItemSchema.extend({
  id: z.string(),
});

export const CreateInventoryItemBodySchema = z.object({
  name: z.string().min(1, 'Ingrese el nombre del insumo').max(255),
  unitOfMeasure: z.nativeEnum(Units),
  unitPrice: z.number().positive('Ingrese un precio válido'),
  stock: z.number().positive('Ingrese una cantidad válida'),
});
