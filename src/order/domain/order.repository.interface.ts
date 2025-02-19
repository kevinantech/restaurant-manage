import { InsertOrder, Order } from './order.entity';

export interface IOrderRepository {
  getOrdersForUser(userId: string): Promise<Order[]>;
  createOrder(body: InsertOrder): Promise<void>;
}
