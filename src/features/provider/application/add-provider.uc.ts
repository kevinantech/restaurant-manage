import { ResponseBodyFactory } from 'lib/http/response-body.factory';
import { InsertProvider } from '../domain/provider.entity';
import { IProviderRepository } from '../domain/provider.repository.interface';
export type IAddProviderUseCase = ReturnType<typeof addProviderUseCase>;

export const addProviderUseCase =
  (repository: IProviderRepository) => async (body: InsertProvider) => {
    await repository.saveProvider(body);
    return ResponseBodyFactory.success({});
  };
