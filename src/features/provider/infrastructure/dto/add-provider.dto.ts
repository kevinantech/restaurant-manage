import { z } from 'zod';
export type AddProviderBody = z.infer<typeof AddProviderBodySchema>;

export const AddProviderBodySchema = z.object({
  name: z.string().min(1, 'Ingrese el nombre del proveedor').max(255),
  email: z
    .email('Ingrese un correo electrónico válido')
    .min(1, 'Ingrese un correo electrónico'),
  phone: z.string().min(1, 'Ingrese un número de teléfono'),
  address: z.string().min(1, 'Ingrese la dirección del proveedor'),
  contact: z.string().min(1, 'Ingrese el nombre de contacto'),
});
