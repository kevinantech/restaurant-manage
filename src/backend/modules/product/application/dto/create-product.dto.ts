import { Type } from "class-transformer";
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  ValidateNested,
} from "class-validator";

export class IngredientDto {
  @IsString()
  @IsNotEmpty()
  inventoryItemId: string;

  @IsInt()
  @Min(1)
  quantity: number;

  constructor(inventoryItemId: string, quantity: number) {
    this.inventoryItemId = inventoryItemId;
    this.quantity = quantity;
  }
}

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => IngredientDto)
  ingredients: IngredientDto[];

  @IsNumber()
  @Min(10000) // Min.precio aceptado 10000 COP
  price: number;

  constructor(
    name: string,
    description: string,
    ingredients: IngredientDto[],
    price: number
  ) {
    this.name = name;
    this.description = description;
    this.ingredients = ingredients;
    this.price = price;
  }
}
