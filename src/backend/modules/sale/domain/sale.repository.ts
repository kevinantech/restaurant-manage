import { ISale } from "./sale.entity";

export interface SaleRepository {
  save(sale: ISale): Promise<void>;
  findAll(): Promise<ISale[] | null>;
}
