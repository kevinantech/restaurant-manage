import { InsertIngredient } from './ingredient.entity';

export interface IIngredientRepository {
  saveIngredient(input: InsertIngredient): Promise<void>;
}
