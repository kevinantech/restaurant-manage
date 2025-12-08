import { IngredientCategory } from './enums/ingredient-category';
import { MeasurementUnit } from './enums/measurement-unit';

// Insumo
export interface Ingredient {
  id: string;
  code: string;
  name: string;
  category: IngredientCategory;
  unit: MeasurementUnit;
  currentStock: number;
  minStock: number;
  averageCost: number;
  lastUpdated: number;
}
