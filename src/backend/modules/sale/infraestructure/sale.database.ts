import { ISale } from "../domain/sale.entity";
import { SaleRepository } from "../domain/sale.repository";
import { SaleAdapter } from "./adapter/sale.adapter";
import { SaleModel } from "./sale.model";

export class SaleDatabase implements SaleRepository {
  public async save(sale: ISale): Promise<void> {
    await new SaleModel(sale).save();
  }

  public async findAll(): Promise<ISale[] | null> {
    const docs = await SaleModel.find();
    return new SaleAdapter(docs).request();
  }
}
