import { Order } from '../domain/order.entity';
import { IOrderRepository } from '../domain/order.repository.interface';
import { OrderModel } from './order.model';

export class OrderRepository implements IOrderRepository {
  async createOrder(order: Order): Promise<void> {
    try {
      await new OrderModel(order).save();
    } catch (e) {
      if (e instanceof Error) console.log(e.message);
    }
  }
}
