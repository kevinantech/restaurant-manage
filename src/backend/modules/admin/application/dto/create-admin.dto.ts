import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, Length } from "class-validator";

export class CreateAdminDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @Length(8, 30)
  @IsStrongPassword({
    minLength: 0,
    minNumbers: 1,
    minSymbols: 0,
    minLowercase: 1,
    minUppercase: 1,
  })
  password: string;

  @IsString()
  @Length(8, 30)
  @IsStrongPassword({
    minLength: 0,
    minNumbers: 1,
    minSymbols: 0,
    minLowercase: 1,
    minUppercase: 1,
  })
  confirmPassword: string;

  constructor(data: {
    name: string;
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
  }) {
    this.name = data.name;
    this.email = data.email;
    this.username = data.username;
    this.password = data.password;
    this.confirmPassword = data.confirmPassword;
  }
}
