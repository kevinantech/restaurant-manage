import { ResponseCode } from '@/shared/_common/constants/response-codes';
import { IBaseResponse } from '@/shared/_common/entity/base-response.model';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

export const findFormatError = async <T extends {}>(
  DTO: ClassConstructor<T>,
  input: any
): Promise<IBaseResponse | false> => {
  const data = plainToInstance(DTO, input);
  if ((await validate(data)).length !== 0)
    return {
      ...ResponseCode['BAD REQUEST'],
      message: 'Los datos proporcionados no son válidos.',
    };

  return false;
};
