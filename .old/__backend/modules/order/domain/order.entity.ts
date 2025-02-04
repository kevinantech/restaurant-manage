export interface IOrder {
  id: string;
  items: IOrderItem[];
  totalAmount: number;
  date: Date;
}

export interface IOrderItem {
  productId: string;
  quantity: number;
}
