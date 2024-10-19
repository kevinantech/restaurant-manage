import { IProductEntity } from "../../shared/product/domain/product.entity";
import { EJerseyEdition, EJerseySize } from "./jersey-enum";

export type JerseyPrice = Record<EJerseyEdition | "RETRO", number>;

export interface IJerseyCustomization {
  name: string;
  number: number;
}

export interface IJerseyEntity extends IProductEntity {
  price: Partial<JerseyPrice>;
  sizes: EJerseySize[];
  isRetro: boolean;
}
