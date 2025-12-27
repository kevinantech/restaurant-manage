import { ResponseBodyFactory } from '@/lib/http/response-body.factory';
import { InsertIngredient } from '../domain/ingredient.entity';
import { IIngredientRepository } from '../domain/ingredient.repository.interface';
export type ICreateIngredientUseCase = ReturnType<
  typeof createIngredientUseCase
>;

export const createIngredientUseCase =
  (repository: IIngredientRepository) => async (body: InsertIngredient) => {
    await repository.saveIngredient(body);
    return ResponseBodyFactory.success({});
  };
