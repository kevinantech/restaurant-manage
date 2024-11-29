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
import { IOrderItem } from "../../domain/order.entity";

export class OrderItemDto implements IOrderItem {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsInt()
  @Min(1)
  quantity: number;

  constructor(productId: string, quantity: number) {
    this.productId = productId;
    this.quantity = quantity;
  }
}

export class CreateOrderDto {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: IOrderItem[];

  constructor(items: IOrderItem[]) {
    this.items = items;
  }
}
