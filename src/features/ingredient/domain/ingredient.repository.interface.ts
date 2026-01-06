import { InsertIngredient } from './ingredient.entity';

export interface IIngredientRepository {
  insertIngredient(input: InsertIngredient): Promise<void>;
}
