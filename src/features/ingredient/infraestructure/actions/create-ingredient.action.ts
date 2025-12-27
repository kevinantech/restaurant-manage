'use server';
import { ValidationError } from '@/lib/errors/validation.error';
import { ActionErrorHandler } from '@/lib/handlers/error.handler';
import { dbConnect } from '@/lib/mongoose/connect';
import { safeParse } from 'zod';
import { createIngredientUseCase } from '../../application/create-ingredient.uc';
import {
  CreateIngredientBody,
  CreateIngredientBodySchema,
} from '../dto/create-ingredient.dto';
import { IngredientRepository } from '../ingredient.repository';

export const createIngredient = async (body: CreateIngredientBody) => {
  try {
    const { success } = safeParse(CreateIngredientBodySchema, body);
    if (!success) throw new ValidationError();
    await dbConnect();
    const usecase = createIngredientUseCase(new IngredientRepository());
    return await usecase(body);
  } catch (error) {
    return new ActionErrorHandler(error).handle();
  }
};
