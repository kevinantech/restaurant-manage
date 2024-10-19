import { IsNotEmpty, IsString, Matches } from "class-validator";

export class CreateLeagueDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9\s]+$/)
  name: string;
}
