import { model, models, Schema, SchemaDefinitionProperty } from "mongoose";
import { IOrder, IOrderItem } from "../domain/order.entity";

const OrderSchema = new Schema<IOrder>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    items: {
      type: [
        {
          productId: {
            type: String,
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
          },
        } as Record<keyof IOrderItem, SchemaDefinitionProperty>,
      ],
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

/* Fixs: ⨯ OverwriteModelError: Cannot overwrite `Orders` model once compiled. */
const OrderModel = models.Orders || model("Orders", OrderSchema);
export { OrderModel };
