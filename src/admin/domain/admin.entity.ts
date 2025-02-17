import { z } from 'zod';

export type RegisterAdminBody = z.infer<typeof RegisterAdminBodySchema>;
export type InsertAdmin = z.infer<typeof InsertAdminSchema>;
export type Admin = z.infer<typeof AdminSchema>;

export const InsertAdminSchema = z.object({
  name: z.string(),
  email: z.string(),
  username: z.string(),
  password: z.string(),
});

export const AdminSchema = InsertAdminSchema.extend({
  id: z.string(),
});

export const RegisterAdminBodySchema = z
  .object({
    name: z.string().min(1, 'Ingrese su nombre').max(55),
    email: z
      .string()
      .min(1, 'Ingrese un email')
      .email('Ingrese un email válido'),
    username: z.string().min(1, 'Ingrese un nombre de usuario').max(25),
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
