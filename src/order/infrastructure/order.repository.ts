import { Order } from '../domain/order.entity';
import { IOrderRepository } from '../domain/order.repository.interface';
import { OrderModel } from './order.model';

export class OrderRepository implements IOrderRepository {
  async getOrdersForUser(userId: string): Promise<Order[]> {
    const docs = await OrderModel.find({ userId });
    return docs.map((doc) => ({
      id: doc.id,
      products: doc.products,
      totalAmount: doc.totalAmount,
      userId: doc.userId,
      createdAt: doc.createdAt,
    }));
  }
  async createOrder(order: Order): Promise<void> {
    await new OrderModel(order).save();
  }
}
