import { Units } from "@/backend/common/constants/units-enum";
import { IsDefined, IsEnum, IsInt, IsNumber, IsString } from "class-validator";

export class ProductDto {
  @IsString()
  @IsDefined()
  name!: string;

  @IsInt()
  @IsDefined()
  quantity!: number;

  @IsNumber()
  @IsDefined()
  unitContent!: number;

  @IsEnum(Units)
  @IsDefined()
  unit!: Units;

  @IsNumber()
  @IsDefined()
  cost!: number;
}
