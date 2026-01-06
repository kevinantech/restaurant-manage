import { IngredientCategory } from './enums/ingredient-category.enum';
import { MeasurementUnit } from './enums/measurement-unit.enum';

export interface Ingredient {
  id: string;
  code: string;
  name: string;
  category: IngredientCategory;
  unit: MeasurementUnit;
  currentStock: number;
  minStock: number;
  averageCost: number;
  isPerishable: boolean;
  updatedAt: string;
}

export interface InsertIngredient {
  code: string;
  name: string;
  category: IngredientCategory;
  unit: MeasurementUnit;
  minStock: number;
  isPerishable: boolean;
}
