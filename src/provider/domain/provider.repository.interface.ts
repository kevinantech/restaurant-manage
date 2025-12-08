import { InsertProvider } from './provider.entity';

export interface IProviderRepository {
  saveProvider(input: InsertProvider): Promise<void>;
}
