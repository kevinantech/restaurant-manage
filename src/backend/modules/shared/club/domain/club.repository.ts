import { IClubEntity } from "./club.entity";

export interface IClubRespository {
  findById(id: string): Promise<IClubEntity | undefined>;
}
