import { InsertOrder } from './order.entity';

export interface IOrderRepository {
  createOrder(body: InsertOrder): Promise<void>;
  /* findById(id: string): Promise<IOrder | null>; // Obtiene una orden por su ID
  findAll(): Promise<IOrder[]>; */ // Obtiene todas las órdenes
}
