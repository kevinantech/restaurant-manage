import { InsertProvider } from '../domain/provider.entity';
import { IProviderRepository } from '../domain/provider.repository.interface';
import { ProviderModel } from './provider.schema';

export class ProviderRepository implements IProviderRepository {
  async saveProvider(input: InsertProvider): Promise<void> {
    await new ProviderModel(input).save();
  }
}
