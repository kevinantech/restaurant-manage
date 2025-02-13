import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';

export class IngredientDto {
  @IsUUID()
  id: string;

  @IsPositive()
  @IsInt()
  @Min(1)
  quantity: number;

  constructor(id: string, quantity: number) {
    this.id = id;
    this.quantity = quantity;
  }
}

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => IngredientDto)
  ingredients: IngredientDto[];

  @IsNumber()
  @Min(10000) // Min.precio aceptado 10000 COP
  price: number;

  @IsUUID()
  userId: string;

  constructor(
    name: string,
    description: string,
    ingredients: IngredientDto[],
    price: number,
    userId: string
  ) {
    this.name = name;
    this.description = description;
    this.ingredients = ingredients;
    this.price = price;
    this.userId = userId;
  }
}
