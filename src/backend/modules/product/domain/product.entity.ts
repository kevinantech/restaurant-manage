import { Units } from "@/backend/common/constants/units-enum";

export interface IProduct {
  id: string;
  name: string;
  initialAmount: number;
  currentAmount: number;
  weightPerUnit: number;
  unit: Units;
  cost: number;
}
