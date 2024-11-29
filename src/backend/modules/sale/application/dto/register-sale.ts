import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class RegisterSaleDto {
  @IsString()
  @IsNotEmpty()
  orderId!: string;

  @IsString()
  description!: string;

  @IsNumber()
  @IsPositive()
  income!: number;

  constructor(orderId: string, description: string, income: number) {
    this.orderId = orderId;
    this.description = description;
    this.income = income;
  }
}
