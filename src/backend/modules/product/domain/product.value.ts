import { Units } from "@/backend/common/constants/units-enum";
import { IProduct } from "./product.entity";

export class Product implements IProduct {
  name: string;
  quantity: number;
  unit: Units;
  price: number;
  constructor(name: string, unit: Units) {
    this.name = name;
    this.quantity = 0;
    this.unit = unit;
    this.price = 0;
  }
}
