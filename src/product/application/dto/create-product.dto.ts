import { Transform, Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

export class IngredientDto {
  @IsUUID()
  id: string;

  @IsPositive()
  @IsNumber()
  @Transform(({ value }) => Number(value))
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

  @IsPositive()
  @IsNumber()
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
