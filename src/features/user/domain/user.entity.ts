import { UserRole } from '@/features/shared/enums/user-role-enum';
import z from 'zod';

export type InsertUser = z.infer<typeof InsertUserSchema>;
export type User = z.infer<typeof UserSchema>;

export const InsertUserSchema = z.object({
  name: z.string(),
  email: z.string(),
  role: z.enum(UserRole),
  password: z.string(),
});

export const UserSchema = InsertUserSchema.extend({
  id: z.string(),
});
