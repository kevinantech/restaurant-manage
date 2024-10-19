import { GeneralUtils } from "@/backend/common/utils/general.util";
import { EProductType } from "./product-enums";
import { IProductEntity } from "./product.entity";

export class ProductValue implements IProductEntity {
  uid: string;
  sku: string;
  title: string;
  clubId: string;
  leagueId: string;
  type: EProductType;
  cover: string;
  gallery: string[];
  available: boolean;

  constructor(
    title: string,
    type: EProductType,
    clubId: string,
    leagueId: string,
    cover: string,
    gallery: string[],
    available: boolean
  ) {
    this.uid = GeneralUtils.generateUUID();
    this.sku = GeneralUtils.generateProductSKU(type);
    this.title = title;
    this.clubId = clubId;
    this.leagueId = leagueId;
    this.type = type;
    this.cover = cover;
    this.gallery = gallery;
    this.available = available;
  }
}
