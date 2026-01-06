'use server';
import { createAction } from '@/lib/http/action';
import { ZodInputValidator } from '@/lib/http/http-validation';
import { createIngredientUseCase } from '../../application/create-ingredient.uc';
import { IngredientRepository } from '../ingredient.repository';
import { CreateIngredientBodySchema } from './create-ingredient.dto';

export const createIngredientAction = createAction(
  new ZodInputValidator(CreateIngredientBodySchema),
  createIngredientUseCase(new IngredientRepository()),
  { dbConnect: true }
);
