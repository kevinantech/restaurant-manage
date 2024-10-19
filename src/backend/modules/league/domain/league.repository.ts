import { ILeagueEntity } from "./league.entity";

export interface ILeagueRepository {
  create(league: ILeagueEntity): Promise<void>;
  find(): Promise<ILeagueEntity[]>;
  findBySlug(slug: string): Promise<ILeagueEntity | undefined>;
}
