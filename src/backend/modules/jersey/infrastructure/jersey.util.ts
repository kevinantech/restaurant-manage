import { EJerseyEdition } from "../domain/jersey-enum";
import { JerseyPrice } from "../domain/jersey.entity";

export class JerseyUtil {
  constructor() {}

  public static getPriceByEditions(
    editions: EJerseyEdition[],
    priceConfig: JerseyPrice
  ): Partial<JerseyPrice> {
    let variationPrices: Partial<JerseyPrice> = {};
    if (editions.includes(EJerseyEdition.FAN)) variationPrices.FAN = priceConfig.FAN;
    if (editions.includes(EJerseyEdition.PLAYER))
      variationPrices.PLAYER = priceConfig.PLAYER;

    if (Object.keys(variationPrices).length === 0)
      throw new Error("Prices cannot be calculated because the editions are empty.");
    return variationPrices;
  }
}
