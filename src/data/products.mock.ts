import { Units } from "@/backend/common/constants/units-enum";
import { IProduct } from "@/backend/modules/product/domain/product.entity";

export const productsMock: IProduct[] = [
  {
    id: "afdg-aw31-ape1-3ksa",
    name: "Jugo Hit",
    quantity: 24,
    unitContent: 200,
    unit: Units.mL,
    cost: 23900,
  },
  {
    id: "afdg-aw31-ape1-3ksa",
    name: "Queso Parmesano",
    quantity: 20,
    unitContent: 35,
    unit: Units.g,
    cost: 87900,
  },
];
