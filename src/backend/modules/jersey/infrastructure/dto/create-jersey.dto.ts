import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from "class-validator";
import { EJerseyEdition } from "../../domain/jersey-enum";

export class CreateJerseyDto {
  @IsString()
  @Length(1, 128)
  title!: string;

  @IsString()
  @IsNotEmpty()
  clubId!: string;

  @IsArray()
  @IsEnum(EJerseyEdition, { each: true })
  @IsOptional()
  @ArrayNotEmpty()
  @ArrayMaxSize(2)
  @ArrayUnique()
  editions?: EJerseyEdition[];

  @IsBoolean()
  isRetro!: boolean;

  /* The first image of the array is the cover image */
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  images!: File[];
}
