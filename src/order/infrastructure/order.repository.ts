import { z } from 'zod';
import { Order, OrderSchema } from '../domain/order.entity';
import { IOrderRepository } from '../domain/order.repository.interface';
import { OrderModel } from './order.model';

const OrdersSchema = z.array(OrderSchema);

export class OrderRepository implements IOrderRepository {
  async getOrdersForUser(userId: string): Promise<Order[]> {
    try {
      const docs = await OrderModel.find({ userId }).lean();
      const _docs = docs.map((doc) => ({ id: doc._id.toString(), ...doc }));
      const { data } = OrdersSchema.safeParse(_docs);
      return data ?? [];
    } catch (e) {
      if (e instanceof Error) console.log(e.message);
      return [];
    }
  }
  async createOrder(order: Order): Promise<void> {
    try {
      await new OrderModel(order).save();
    } catch (e) {
      if (e instanceof Error) console.log(e.message);
    }
  }
}
