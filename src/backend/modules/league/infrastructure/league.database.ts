import { ECollection } from "@/backend/common/constants";
import { FirebaseAdmin } from "@/firebase/firebase-admin";
import { ILeagueEntity } from "../domain/league.entity";
import { ILeagueRepository } from "../domain/league.repository";
import { League } from "../domain/league.value";

const leaguesRef = FirebaseAdmin.getInstance().db.collection(ECollection.LEAGUES);

export class LeagueDatabase implements ILeagueRepository {
  /**
   * https://firebase.google.com/docs/firestore/manage-data/add-data?hl=es&authuser=1#set_a_document
   */
  async create(league: ILeagueEntity): Promise<void> {
    await leaguesRef.doc(league.id).set({ ...league }); // Use spread operator always at set method.
  }

  /**
   * https://firebase.google.com/docs/firestore/query-data/get-data?hl=es&authuser=1#get_all_documents_in_a_collection
   */
  async find(): Promise<ILeagueEntity[]> {
    const { docs } = await leaguesRef.get();
    const data = docs.map((doc) => doc.data());
    return data as ILeagueEntity[];
  }

  /**
   * https://firebase.google.com/docs/firestore/query-data/get-data?hl=es&authuser=1#get_multiple_documents_from_a_collection
   */
  async findBySlug(slug: string): Promise<ILeagueEntity | undefined> {
    const { docs } = await leaguesRef.where("slug" as keyof League, "==", slug).get();
    return docs.length > 0 ? (docs[0].data() as ILeagueEntity) : undefined;
  }
}
