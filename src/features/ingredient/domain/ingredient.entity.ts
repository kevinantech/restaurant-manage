import { IngredientCategory } from './enums/ingredient-category.enum';
import { MeasurementUnit } from './enums/measurement-unit.enum';

// Insumo (timestamps)
export interface Ingredient {
  id: string;
  code: string;
  name: string;
  category: IngredientCategory;
  unit: MeasurementUnit;
  currentStock: number;
  minStock: number;
  averageCost: number;
  updatedAt: string;
}

export interface InsertIngredient {
  code: string;
  name: string;
  category: IngredientCategory;
  unit: MeasurementUnit;
  minStock: number;
}
