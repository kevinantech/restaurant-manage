import { ISale } from "./sale.entity";

export interface ISaleRepository {
  register(sale: ISale): Promise<ISale | null>;
  find(): Promise<ISale[] | null>;
}
