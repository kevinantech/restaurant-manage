import { Units } from "@/backend/common/constants/units-enum";
import { ProductEntryCategory } from "./product-entry-category-enum";
import { IProductEntry } from "./product-entry.entity";
import { GeneralUtils } from "@/backend/common/utils/general.util";

export class ProductEntry implements IProductEntry {
  public readonly id: string;
  public readonly name: string;
  public readonly category: ProductEntryCategory;
  public readonly unitOfMeasure: Units;
  public readonly unitWeight: number;
  public readonly stock: number;

  constructor(
    name: string,
    category: ProductEntryCategory,
    unitOfMeasure: Units,
    unitWeight: number,
    stock: number
  ) {
    this.id = GeneralUtils.generateId();
    this.name = name;
    this.category = category;
    this.unitOfMeasure = unitOfMeasure;
    this.unitWeight = unitWeight;
    this.stock = stock;
  }
}
