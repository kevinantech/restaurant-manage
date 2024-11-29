import { IOrder } from "../domain/order.entity";
import { OrderRepository } from "../domain/order.repository";
import { OrderAdapter } from "./adapters/order.adapter";
import { OrderModel } from "./order.model";

export class OrderDatabase implements OrderRepository {
  // Agrega una nueva orden
  async add(order: IOrder): Promise<void> {
    await new OrderModel(order).save();
  }

  // Obtiene una orden por su ID
  async findById(id: string): Promise<IOrder | null> {
    const doc = await OrderModel.findOne({ id });
    return new OrderAdapter(doc).requestOne();
  }

  // Obtiene todas las órdenes
  async findAll(): Promise<IOrder[]> {
    const docs = await OrderModel.find();
    return new OrderAdapter(docs).request();
  }
}
