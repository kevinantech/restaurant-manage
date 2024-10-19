import { ResponseCode } from "@/backend/common/constants";
import { IResponseBase } from "@/backend/common/entity/response-base.model";
import { ILeagueEntity } from "../domain/league.entity";
import { ILeagueRepository } from "../domain/league.repository";
import { League } from "../domain/league.value";

export type CreateLeagueData = {
  id: string;
};

export class LeagueUC {
  constructor(private readonly leagueRepository: ILeagueRepository) {}

  async create(name: string): Promise<IResponseBase<CreateLeagueData>> {
    name = name
      .split(" ")
      .map((word) => word.trim())
      .filter((word) => word)
      .join(" "); // Normalization

    if (name.length < 3)
      return {
        ...ResponseCode["BAD REQUEST"],
        message: "Formato invalido.",
      };

    const league = new League(name);
    if (await this.leagueRepository.findBySlug(league.slug)) {
      return {
        ...ResponseCode["BAD REQUEST"],
        message: "La liga ya existe.",
      };
    }

    await this.leagueRepository.create(league);
    return {
      ...ResponseCode["OK"],
      message: "Liga agregada.",
      data: { id: league.id },
    };
  }

  async getAll(): Promise<IResponseBase<ILeagueEntity[]>> {
    const leagues = await this.leagueRepository.find();

    return leagues.length > 0
      ? {
          ...ResponseCode.OK,
          data: leagues,
          message: "Ligas encontradas.",
        }
      : {
          ...ResponseCode["NOT FOUND"],
          message: "No se han podido encontrar las ligas.",
        };
  }
}
