import { ResponseCode } from "@/backend/common/constants";
import { IResponseBase } from "@/backend/common/entity/response-base.model";
import { ProductEntryRepository } from "@/backend/modules/product-entry/domain/product-entry.repository";
import { ProductRepository } from "@/backend/modules/product/domain/product.repository";
import { OrderRepository } from "../domain/order.repository";
import { CreateOrderDto } from "./dto/create-order.dto";
import {
  Ingredient,
  IProduct,
} from "@/backend/modules/product/domain/product.entity";
import { Order } from "../domain/order.value";
import { GeneralUtils } from "@/backend/common/utils/general.util";
import { SaleRepository } from "../../sale/domain/sale.repository";
import { Sale } from "../../sale/domain/sale.value";
type OP = IProduct & { productQuantity: number };

export class CreateOrder {
  constructor(
    private readonly saleRepository: SaleRepository,
    private readonly orderRepository: OrderRepository,
    private readonly productRepository: ProductRepository,
    private readonly inventoryItemRepository: ProductEntryRepository
  ) {}

  async create(data: CreateOrderDto): Promise<IResponseBase> {
    const { items: orderItems } = data;

    const orderProducts = (
      (await Promise.all(
        orderItems.map(async (o) => {
          const product = await this.productRepository.findById(o.productId);
          if (!product) return undefined;
          return {
            ...product,
            productQuantity: o.quantity,
          } as OP;
        })
      )) as (OP | undefined)[]
    ).filter((o) => !!o);

    if (orderProducts.length !== data.items.length)
      return {
        ...ResponseCode["BAD REQUEST"],
        message: "Uno o más productos no están disponibles.",
      };

    /**
     * Recopila los ingredientes necesarios para la orden.
     */
    const necessaryIngredients = orderProducts.reduce(
      (acc: Ingredient[], o: OP) => {
        o.ingredients.map((i) => {
          const accIngredient = acc.find(
            (ingr) => ingr.inventoryItemId === i.inventoryItemId
          );

          if (accIngredient)
            accIngredient.quantity += i.quantity * o.productQuantity;
          else
            acc.push({
              inventoryItemId: i.inventoryItemId,
              quantity: i.quantity * o.productQuantity,
            });
        });

        return acc;
      },
      []
    );

    /**
     * Confirma la disponibilidad de insumos.
     */
    type OrderIngredient = { ingredientId: string; stockUpdated: number };
    const orderIngredients: OrderIngredient[] = await Promise.all(
      necessaryIngredients.map(async (ingr) => {
        const ingredient = await this.inventoryItemRepository.findById(
          ingr.inventoryItemId
        );
        return {
          ingredientId: ingr.inventoryItemId,
          stockUpdated: ingredient?.stock
            ? ingredient.stock - ingr.quantity
            : -1,
        };
      })
    );

    if (orderIngredients.some(({ stockUpdated }) => stockUpdated < 0)) {
      return {
        ...ResponseCode["NOT FOUND"],
        message: "El stock es insuficiente.",
      };
    }

    // Actualiza insumos.
    await Promise.all(
      orderIngredients.map(
        async ({ ingredientId, stockUpdated }) =>
          await this.inventoryItemRepository.update(ingredientId, {
            stock: stockUpdated,
          })
      )
    );

    // Crea la orden
    const totalAmount = orderProducts.reduce(
      (acc: number, o) => acc + o.price * o.productQuantity,
      0
    );

    const val = new Order(
      GeneralUtils.generateId(),
      data.items,
      totalAmount,
      new Date()
    );
    await this.orderRepository.add(val);

    const saleVal = new Sale(
      GeneralUtils.generateId(),
      val.id,
      "", // TODO: Datos de la orden.
      val.totalAmount
    );

    await this.saleRepository.save(saleVal);

    return { ...ResponseCode.OK, message: "La orden ha sido creada." };
  }
}
