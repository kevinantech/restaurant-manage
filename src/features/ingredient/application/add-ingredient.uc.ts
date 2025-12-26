import { ResponseBodyFactory } from '@/lib/http/response-body.factory';
import { InsertIngredient } from '../domain/ingredient.entity';
import { IIngredientRepository } from '../domain/ingredient.repository.interface';
export type IAddIngredientUseCase = ReturnType<typeof addIngredientUseCase>;

export const addIngredientUseCase =
  (repository: IIngredientRepository) => async (body: InsertIngredient) => {
    await repository.saveIngredient(body);
    return ResponseBodyFactory.success({});
  };
