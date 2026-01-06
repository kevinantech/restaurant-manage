import { z, ZodType } from 'zod';
import { BadRequestException } from './http-exception';

export interface InputValidator<T, S> {
  parse(input: unknown): Promise<T> | T;
}

/**
 * An implementation of InputValidator using Zod schemas.
 */
export class ZodInputValidator<S extends ZodType>
  implements InputValidator<z.infer<S>, S>
{
  constructor(private readonly schema: S) {}

  parse(input: unknown): z.infer<S> {
    const result = this.schema.safeParse(input);
    // TODO: Remove debug log
    console.log('🚀 ~ ZodInputValidator ~ parse ~ result:', result);

    if (!result.success) {
      throw new BadRequestException('Invalid input data');
    }

    return result.data;
  }
}
