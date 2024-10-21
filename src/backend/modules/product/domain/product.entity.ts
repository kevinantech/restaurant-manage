import { Units } from "@/backend/common/constants/units-enum";

export interface IProduct {
  id: string;
  name: string;
  quantity: number;
  unitContent: number;
  unit: Units;
  cost: number;
}
