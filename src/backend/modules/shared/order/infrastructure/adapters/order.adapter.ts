import { IOrder } from "../../domain/order.entity";

export class OrderAdapter {
  private adaptee: any;
  constructor(adaptee: any) {
    this.adaptee = adaptee;
  }

  requestOne(): IOrder {
    return {
      id: this.adaptee.id,
      items: this.adaptee.items,
      totalAmount: this.adaptee.totalAmount,
      date: this.adaptee.date,
    };
  }

  request(): IOrder[] {
    return (this.adaptee as []).map((o) => new OrderAdapter(o).requestOne());
  }
}
