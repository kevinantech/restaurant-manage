import { z } from 'zod';
export type RegisterAdminBody = z.infer<typeof RegisterAdminBodySchema>;

export const RegisterAdminBodySchema = z
  .object({
    name: z.string().min(1, 'Ingrese su nombre').max(55),
    email: z.email('Ingrese un email válido').min(1, 'Ingrese un email'),
    password: z
      .string()
      .min(1, 'Ingrese la contraseña')
      .min(8, 'Contraseña demasiado corta')
      .max(255),
    confirmPassword: z.string().min(1, 'Ingrese la contraseña'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'], // Asocia el error al campo "confirmPassword"
  });
