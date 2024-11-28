import { IsEnum, IsNotEmpty, IsNumber, IsString, Min } from "class-validator";
import { ProductEntryCategory } from "../../domain/product-entry-category-enum";
import { Units } from "@/backend/common/constants/units-enum";

export class CreateProductEntryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(ProductEntryCategory)
  category: ProductEntryCategory;

  @IsEnum(Units)
  unitOfMeausure: Units;

  @IsNumber()
  @Min(0)
  unitWeight: number;

  @IsNumber()
  @Min(0)
  stock: number;

  constructor(
    name: string,
    category: ProductEntryCategory,
    unitOfMeasure: Units,
    stock: number,
    restockThreshold: number
  ) {
    this.name = name;
    this.category = category;
    this.unitOfMeausure = unitOfMeasure;
    this.unitWeight = restockThreshold;
    this.stock = stock;
  }
}
