import { ISale } from "../../domain/sale.entity";
export class SaleAdapter {
  private adaptee: any;
  constructor(adaptee: any) {
    this.adaptee = adaptee;
  }

  requestOne(): ISale {
    return {
      id: this.adaptee.id,
      orderId: this.adaptee.items,
      description: this.adaptee.description,
      income: this.adaptee.income,
    };
  }

  request(): ISale[] {
    return (this.adaptee as []).map((o) => new SaleAdapter(o).requestOne());
  }
}
