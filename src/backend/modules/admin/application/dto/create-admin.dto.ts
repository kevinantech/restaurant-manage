import { Equals, IsString, Length, Matches } from "class-validator";

export class CreateAdminDto {
  @IsString()
  name!: string;

  @IsString()
  username!: string;

  @IsString()
  @Length(8, 30, { message: "La constrañea debe tener entre 8 y 30 caracteres." })
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)$/, {
    message:
      "La contraseña debe contener al menos una mayúscula, una minúscula y un número.",
  })
  password!: string;

  @IsString()
  @Length(8, 30)
  @Equals("password", { message: "La confirmación de la contraseña no coincide." })
  confirmPassword!: string;
}
