import 'reflect-metadata';
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

  @IsEnum(Units)
  unitOfMeasure: Units;

  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => Number(value))
  unitPrice: number;

  @IsNumber()
  @Min(0)
  stock: number;

  @IsUUID()
  userId: string;

  constructor(
    name: string,
    unitOfMeasure: Units,
    unitPrice: number,
    stock: number,
    userId: string
  ) {
    this.name = name;
    this.unitOfMeasure = unitOfMeasure;
    this.unitPrice = unitPrice;
    this.stock = stock;
    this.userId = userId;
  }
}
