import { v4 as uuid } from "uuid";
import { ILeagueEntity } from "./league.entity";

export class League implements ILeagueEntity {
  id: string;
  name: string;
  slug: string;
  constructor(name: string) {
    this.id = uuid();
    this.name = name;
    this.slug = name.split(" ").join("-").toLowerCase();
  }
}
