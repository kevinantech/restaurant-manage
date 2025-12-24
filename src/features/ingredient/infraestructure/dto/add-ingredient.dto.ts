import { z } from 'zod';
import { IngredientCategory } from '../../domain/enums/ingredient-category.enum';
import { MeasurementUnit } from '../../domain/enums/measurement-unit.enum';
export type AddIngredientBody = z.infer<typeof AddIngredientBodySchema>;

export const AddIngredientBodySchema = z.object({
  code: z
    .string()
    .min(1, 'Ingrese el código del ingrediente')
    .max(20, 'El código excede la longitud máxima permitida'),
  name: z
    .string()
    .min(1, 'Ingrese el nombre del ingrediente')
    .max(255, 'El nombre excede la longitud máxima permitida'),
  category: z.enum(IngredientCategory, 'Seleccione una categoría válida'),
  unit: z.enum(MeasurementUnit, 'Seleccione una unidad de medida válida'),
  minStock: z.number().positive('El stock mínimo debe ser mayor a cero'),
});
