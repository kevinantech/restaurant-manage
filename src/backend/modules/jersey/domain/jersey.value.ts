import { EProductType } from "../../shared/product/domain/product-enums";
import { ProductValue } from "../../shared/product/domain/product.value";
import { EJerseySize } from "./jersey-enum";
import { IJerseyEntity, JerseyPrice } from "./jersey.entity";

export class JerseyValue extends ProductValue implements IJerseyEntity {
  price: Partial<JerseyPrice>;
  sizes: EJerseySize[];
  isRetro: boolean;

  constructor(
    title: string,
    clubId: string,
    leagueId: string,
    cover: string,
    gallery: string[],
    available: boolean,
    price: Partial<JerseyPrice>,
    sizes: EJerseySize[],
    isRetro: boolean
  ) {
    super(title, EProductType.JERSEY, clubId, leagueId, cover, gallery, available);
    this.price = price;
    this.sizes = sizes;
    this.isRetro = isRetro;
  }
}
