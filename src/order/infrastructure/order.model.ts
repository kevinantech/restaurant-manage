import { model, models, Schema, SchemaDefinitionProperty } from 'mongoose';
import { InsertOrder, OrderProduct } from '../domain/order.entity';

const OrderSchema = new Schema<InsertOrder>(
  {
    products: {
      type: [
        {
          id: {
            type: String,
            required: true,
          },
          unitPrice: {
            type: Number,
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
          },
        } as Record<keyof OrderProduct, SchemaDefinitionProperty>,
      ],
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const _OrderModel = model('orders', OrderSchema);
type OrderModelType = typeof _OrderModel;

/* Fixs: ⨯ OverwriteModelError: Cannot overwrite `Orders` model once compiled. */
const OrderModel: OrderModelType = models?.orders || _OrderModel;
export { OrderModel };
