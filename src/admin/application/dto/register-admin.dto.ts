import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';

export class RegisterAdminDto {
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

  constructor(
    name: string,
    email: string,
    username: string,
    password: string,
    confirmPassword: string
  ) {
    this.name = name;
    this.email = email;
    this.username = username;
    this.password = password;
    this.confirmPassword = confirmPassword;
  }
}
