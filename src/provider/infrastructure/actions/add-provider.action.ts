'use server';
import { ActionErrorHandler } from 'lib/handlers/error.handler';
import {
  AddProviderBody,
  AddProviderBodySchema,
} from '../dto/add-provider.dto';
import { safeParse } from 'zod';
import { ValidationError } from 'lib/errors/validation.error';
import { dbConnect } from 'lib/mongoose/connect';
import { ProviderRepository } from '../provider.repository';
import { addProviderUseCase } from '@/provider/application/add-provider.uc';

export const addProvider = async (body: AddProviderBody) => {
  try {
    const { success } = safeParse(AddProviderBodySchema, body);
    if (!success) throw new ValidationError();
    await dbConnect();
    const _addProviderUseCase = addProviderUseCase(new ProviderRepository());
    return await _addProviderUseCase(body);
  } catch (error) {
    return new ActionErrorHandler(error).handle();
  }
};
