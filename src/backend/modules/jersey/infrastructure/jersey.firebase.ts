import { ProductDatabase } from "../../shared/product/infrastructure/product.database";
import { IJerseyRepository } from "../domain/jersey.repository";

export class JerseyDatabase extends ProductDatabase implements IJerseyRepository {}
