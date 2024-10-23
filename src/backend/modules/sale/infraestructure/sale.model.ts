import { model, models, Schema } from "mongoose";
import { ISale } from "../domain/sale.entity";

const SaleSchema = new Schema<ISale>(
  {
    id: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    products: {
      type: [String],
      required: true,
    },
    income: {
      type: Number,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

const SaleModel = models.Sales || model("Sales", SaleSchema);
export { SaleModel };
