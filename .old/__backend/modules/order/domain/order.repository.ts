import { IOrder } from "./order.entity";

export interface OrderRepository {
  add(order: IOrder): Promise<void>; // Agrega una nueva orden
  findById(id: string): Promise<IOrder | null>; // Obtiene una orden por su ID
  findAll(): Promise<IOrder[]>; // Obtiene todas las órdenes
}
