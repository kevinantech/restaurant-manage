import { ArrayNotEmpty, IsArray, IsNumber, IsString } from "class-validator";

export class SaleDto {
  @IsString()
  description!: string;

  @IsArray()
  @IsString({ each: true })
  @ArrayNotEmpty()
  products!: string[];

  @IsNumber()
  income!: number;
}
