import { ResponseCode } from "@/backend/common/constants";
import { IResponseBase } from "@/backend/common/entity/response-base.model";
import { EJerseyEdition, EJerseySize } from "@/backend/modules/jersey/domain/jersey-enum";
import { IClubRespository } from "../../shared/club/domain/club.repository";
import { IProductRepository } from "../../shared/product/domain/product.repository";
import { JerseyValue } from "../domain/jersey.value";
import { JerseyPrice } from "../domain/jersey.entity";
import { JerseyUtil } from "../infrastructure/jersey.util";

export type CreateJerseyData = {};

export class CreateJerseyUC {
  constructor(
    private readonly productRepository: IProductRepository,
    private readonly clubRepository: IClubRespository
  ) {}
  async execute(
    title: string,
    clubId: string,
    editions: EJerseyEdition[] | undefined,
    isRetro: boolean,
    images: File[]
  ): Promise<IResponseBase<CreateJerseyData>> {
    try {
      if (!isRetro && !editions)
        throw new Error("The editions are mandatory for non-retro jerseys.");

      const club = await this.clubRepository.findById(clubId);
      if (!club) throw new Error("Club not found");

      // TODO: Call the price configuration for jerseys.
      const priceConfigResponse = await fetch("");
      const priceConfigResult = (await priceConfigResponse.json()) as JerseyPrice;
      if (
        !priceConfigResult ||
        !priceConfigResult.FAN ||
        !priceConfigResult.PLAYER ||
        !priceConfigResult.RETRO
      )
        throw new Error("Jersey prices are not available.");

      const gallery = await this.productRepository.addImages(images);
      if (!gallery || gallery.length === 0) throw new Error("Gallery url not received.");

      const jersey = new JerseyValue(
        title,
        club.id,
        club.leagueId,
        gallery.shift() as string,
        gallery,
        true,
        isRetro
          ? { RETRO: priceConfigResult.RETRO }
          : JerseyUtil.getPriceByEditions(editions!, priceConfigResult),
        [EJerseySize.S, EJerseySize.M, EJerseySize.L, EJerseySize.XL, EJerseySize.XXL],
        isRetro
      );
      const payload = await this.productRepository.add(jersey);
      return {
        ...ResponseCode.OK,
        message: "Operación exitosa",
        data: payload,
      };
    } catch (error: any) {
      return {
        ...ResponseCode["BAD REQUEST"],
        message: error.message,
      };
    }
  }
}
