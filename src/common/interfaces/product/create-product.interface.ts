import { EJerseyEdition } from "@/backend/modules/jersey/domain/jersey-enum";

export interface ICreateProduct {
  title: string;
  clubId: string;
  editions: EJerseyEdition[];
  isRetro: boolean;
}
