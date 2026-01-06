import { ApiResponseFactory } from '@/lib/http/http-response';
import { InsertIngredient } from '../domain/ingredient.entity';
import { IIngredientRepository } from '../domain/ingredient.repository.interface';
import { HTTP_STATUS } from '@/lib/http/http-status';
export type ICreateIngredientUseCase = ReturnType<
  typeof createIngredientUseCase
>;

export const createIngredientUseCase =
  (repository: IIngredientRepository) => async (body: InsertIngredient) => {
    await repository.insertIngredient(body);
    return ApiResponseFactory.success(
      {},
      'Ingrediente creado exitosamente',
      HTTP_STATUS.CREATED
    );
  };
