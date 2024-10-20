import { IsEmail, IsString } from "class-validator";

export class AuthAdminDto {
  @IsEmail()
  email!: string;
  @IsString()
  password!: string;
}
