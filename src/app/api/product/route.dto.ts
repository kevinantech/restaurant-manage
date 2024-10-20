import { Units } from "@/backend/common/constants/units-enum";
import { IsDefined, IsEnum, IsString } from "class-validator";

export class ProductDto {
  @IsString()
  @IsDefined()
  name!: string;

  @IsEnum(Units)
  @IsDefined()
  unit!: Units;
}
