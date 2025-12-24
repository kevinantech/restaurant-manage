import { Order } from '../domain/order.entity';
import { IOrderRepository } from '../domain/order.repository.interface';
import { OrderModel } from './order.model';

export class OrderRepository implements IOrderRepository {
  async getOrdersForUser(
    { userId }: { userId: string },
    page: number,
    limit: number
  ): Promise<Order[]> {
    const docs = await OrderModel.find({ userId })
      .skip((page - 1) * limit)
      .limit(limit);
    return docs.map((doc) => ({
      id: doc.id,
      products: doc.products.map((product) => ({
        id: product.id,
        quantity: product.quantity,
        unitPrice: product.unitPrice,
      })),
      totalAmount: doc.totalAmount,
      userId: doc.userId,
      createdAt: doc.createdAt,
    }));
  }

  async getTotalOrdersForUser(filter: { userId: string }): Promise<number> {
    return OrderModel.countDocuments(filter);
  }

  async createOrder(order: Order): Promise<void> {
    await new OrderModel(order).save();
  }
}
