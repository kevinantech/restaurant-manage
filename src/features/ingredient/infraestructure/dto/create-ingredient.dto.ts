import { z } from 'zod';
import { IngredientCategory } from '../../domain/enums/ingredient-category.enum';
import { MeasurementUnit } from '../../domain/enums/measurement-unit.enum';
export type CreateIngredientBody = z.infer<typeof CreateIngredientBodySchema>;

export const CreateIngredientBodySchema = z.object({
  code: z
    .string()
    .min(1, 'Ingrese el código del ingrediente')
    .max(20, 'El código excede la longitud máxima permitida')
    .regex(
      /^[A-Z0-9]+(-[A-Z0-9]+)*$/,
      'Use solo letras y números. Los guiones solo están permitidos entre grupos (ej: INS-001-AB).'
    ),
  name: z
    .string()
    .min(1, 'Ingrese el nombre del ingrediente')
    .max(255, 'El nombre excede la longitud máxima permitida'),
  category: z.enum(IngredientCategory, 'Seleccione una categoría válida'),
  unit: z.enum(MeasurementUnit, 'Seleccione una unidad de medida válida'),
  minStock: z
    .number('Ingrese el stock mínino')
    .positive('El stock mínimo debe ser mayor a cero'),
  notes: z.string().max(255),
});
