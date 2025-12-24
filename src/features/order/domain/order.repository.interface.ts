import { InsertOrder, Order } from './order.entity';

export interface IOrderRepository {
  getOrdersForUser(
    filter: { userId: string },
    page: number,
    limit: number
  ): Promise<Order[]>;
  getTotalOrdersForUser(filter: { userId: string }): Promise<number>;
  createOrder(body: InsertOrder): Promise<void>;
}
