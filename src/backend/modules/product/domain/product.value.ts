import { Units } from "@/backend/common/constants/units-enum";
import { IProduct } from "./product.entity";
import { v4 as uuid } from "uuid";

export class Product implements IProduct {
  id: string;
  name: string;
  initialAmount: number;
  currentAmount: number;
  weightPerUnit: number;
  unit: Units;
  cost: number;
  constructor(
    name: string,
    initialAmount: number,
    weigthContent: number,
    unit: Units,
    cost: number
  ) {
    this.id = uuid();
    this.name = name;
    this.initialAmount = initialAmount;
    this.currentAmount = initialAmount;
    this.weightPerUnit = weigthContent;
    this.unit = unit;
    this.cost = cost;
  }
}
