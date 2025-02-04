import { ISale } from "./sale.entity";

export class Sale implements ISale {
  id: string;
  orderId: string;
  description: string;
  income: number;
  constructor(
    id: string,
    orderId: string,
    description: string,
    income: number
  ) {
    this.id = id;
    this.orderId = orderId;
    this.description = description;
    this.income = income;
  }
}
