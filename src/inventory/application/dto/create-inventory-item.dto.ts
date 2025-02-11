import { InventoryItemCategory } from '@/inventory/domain/inventory-item-category-enum';
import { Units } from '@/shared/_common/constants/units-enum';
import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class CreateInventoryItemDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(InventoryItemCategory)
  category: InventoryItemCategory;

  @IsEnum(Units)
  unitOfMeasure: Units;

  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => Number(value))
  unitWeight: number;

  @IsNumber()
  @Min(0)
  stock: number;

  @IsUUID()
  userId: string;

  constructor(
    name: string,
    category: InventoryItemCategory,
    unitOfMeasure: Units,
    unitWeight: number,
    stock: number,
    userId: string
  ) {
    this.name = name;
    this.category = category;
    this.unitOfMeasure = unitOfMeasure;
    this.unitWeight = unitWeight;
    this.stock = stock;
    this.userId = userId;
  }
}
