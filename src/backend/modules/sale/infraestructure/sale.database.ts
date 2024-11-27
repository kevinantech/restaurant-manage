import { ISaleRepository } from "../domain/sale.repository";
import { ISale } from "../domain/sale.entity";
import { SaleModel } from "./sale.model";

export class SaleDatabase implements ISaleRepository {
  public async register(sale: ISale): Promise<ISale | null> {
    try {
      const saleModel = new SaleModel(sale);
      const saleSaved = await saleModel.save();
      return saleSaved;
    } catch (e) {
      console.error({ at: `${__dirname} => registerSale`, error: e });
    }
    return null;
  }

  public async find(): Promise<ISale[] | null> {
    const sales = await SaleModel.find();
    return sales;
  }
}
