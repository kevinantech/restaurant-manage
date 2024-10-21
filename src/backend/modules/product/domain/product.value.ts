import { Units } from "@/backend/common/constants/units-enum";
import { IProduct } from "./product.entity";
import { v4 as uuid } from "uuid";

export class Product implements IProduct {
  id: string;
  name: string;
  quantity: number;
  unitContent: number;
  unit: Units;
  cost: number;
  constructor(
    name: string,
    quantity: number,
    unitContent: number,
    unit: Units,
    cost: number
  ) {
    this.id = uuid();
    this.name = name;
    this.quantity = quantity;
    this.unitContent = unitContent;
    this.unit = unit;
    this.cost = cost;
  }
}
