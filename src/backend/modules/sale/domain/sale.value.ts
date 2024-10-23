import { v4 as uuid } from "uuid";
import { ISale } from "./sale.entity";

export class Sale implements ISale {
  id: string;
  description: string;
  products: string[];
  income: number;
  constructor(description: string, products: string[], income: number) {
    this.id = uuid();
    this.description = description;
    this.products = products;
    this.income = income;
  }
}
