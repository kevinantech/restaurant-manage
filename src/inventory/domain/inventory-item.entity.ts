import { Units } from '@/shared/_common/constants/units-enum';

export interface IInventoryItem {
  id: string;
  name: string;
  unitOfMeasure: Units;
  unitPrice: number;
  stock: number;
  userId: string;
}
