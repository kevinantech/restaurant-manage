'use server';
import { addIngredientUseCase } from '@/ingredient/application/add-ingredient.uc';
import { ValidationError } from 'lib/errors/validation.error';
import { ActionErrorHandler } from 'lib/handlers/error.handler';
import { dbConnect } from 'lib/mongoose/connect';
import { safeParse } from 'zod';
import {
  AddIngredientBody,
  AddIngredientBodySchema,
} from '../dto/add-ingredient.dto';
import { IngredientRepository } from '../ingredient.repository';

export const addIngredient = async (body: AddIngredientBody) => {
  try {
    const { success } = safeParse(AddIngredientBodySchema, body);
    if (!success) throw new ValidationError();
    await dbConnect();
    const _addIngredientUseCase = addIngredientUseCase(
      new IngredientRepository()
    );
    return await _addIngredientUseCase(body);
  } catch (error) {
    return new ActionErrorHandler(error).handle();
  }
};
