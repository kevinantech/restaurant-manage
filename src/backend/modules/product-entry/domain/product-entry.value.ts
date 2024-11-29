import { Units } from "@/backend/common/constants/units-enum";
import { ProductEntryCategory } from "./product-entry-category-enum";
import { IProductEntry } from "./product-entry.entity";

export class ProductEntry implements IProductEntry {
  public readonly id: string;
  public readonly name: string;
  public readonly category: ProductEntryCategory;
  public readonly unitOfMeasure: Units;
  public readonly unitWeight: number;
  public readonly stock: number;

  constructor(
    id: string,
    name: string,
    category: ProductEntryCategory,
    unitOfMeasure: Units,
    unitWeight: number,
    stock: number
  ) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.unitOfMeasure = unitOfMeasure;
    this.unitWeight = unitWeight;
    this.stock = stock;
  }
}
