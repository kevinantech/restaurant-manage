import { IsEnum, IsNotEmpty, IsNumber, IsPositive, IsString, Min } from "class-validator";
import { ProductEntryCategory } from "../../domain/product-entry-category-enum";
import { Units } from "@/backend/common/constants/units-enum";

export class CreateProductEntryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(ProductEntryCategory)
  category: ProductEntryCategory;

  @IsEnum(Units)
  unitOfMeasure: Units;

  @IsNumber()
  @IsPositive()
  unitWeight: number;

  @IsNumber()
  @Min(0)
  stock: number;

  constructor(
    name: string,
    category: ProductEntryCategory,
    unitOfMeasure: Units,
    unitWeight: number,
    stock: number
  ) {
    this.name = name;
    this.category = category;
    this.unitOfMeasure = unitOfMeasure;
    this.unitWeight = unitWeight;
    this.stock = stock;
  }
}
