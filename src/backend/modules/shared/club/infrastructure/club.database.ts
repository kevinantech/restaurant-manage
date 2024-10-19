import { FirebaseAdmin } from "@/firebase/firebase-admin";
import { ECollection } from "@/backend/common/constants/collections-enum";
import { IClubEntity } from "../domain/club.entity";
import { IClubRespository } from "../domain/club.repository";

export class ClubDatabase implements IClubRespository {
  async findById(id: string): Promise<IClubEntity | undefined> {
    const docRef = FirebaseAdmin.getInstance().db.collection(ECollection.CLUBS).doc(id);
    const docSnapshot = await docRef.get();
    return docSnapshot.exists ? (docSnapshot.data() as IClubEntity) : undefined;
  }
}
