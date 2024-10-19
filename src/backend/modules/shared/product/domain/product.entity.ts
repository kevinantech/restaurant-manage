import { EProductType } from "./product-enums";

export interface IProductEntity {
  uid: string;
  sku: string;
  title: string;
  clubId: string;
  leagueId: string;
  type: EProductType;
  cover: string;
  gallery: string[];
  available: boolean;
}
