import { IOrder, IOrderItem } from "./order.entity";

export class Order implements IOrder {
  id: string;
  items: IOrderItem[];
  totalAmount: number;
  date: Date;

  constructor(
    id: string,
    items: IOrderItem[],
    totalAmount: number,
    date: Date
  ) {
    this.id = id;
    this.items = items;
    this.totalAmount = totalAmount;
    this.date = date;
  }
}

export class OrderItem implements IOrderItem {
  productId: string;
  quantity: number;
  constructor(productId: string, quantity: number) {
    this.productId = productId;
    this.quantity = quantity;
  }
}
