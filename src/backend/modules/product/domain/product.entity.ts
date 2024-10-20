import { Units } from "@/backend/common/constants/units-enum";

export interface IProduct {
  name: string;
  quantity: number;
  unit: Units;
  price: number;
}
