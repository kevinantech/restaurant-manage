import { IsString, Length } from "class-validator";

export class AuthAdminDto {
  @IsString()
  @Length(1, 128)
  uid!: string;
}
