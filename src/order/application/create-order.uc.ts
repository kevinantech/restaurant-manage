import { InventoryItem } from '@/inventory/domain/inventory-item.value';
import { IInventoryRepository } from '@/inventory/domain/inventory.repository.interface';
import { IProduct } from '@/product/domain/product.entity';
import { IProductRepository } from '@/product/domain/product.repository.interface';
import { ResponseCode } from '@/shared/_common/constants/response-codes';
import { GeneralUtils } from 'utils/general.util';
import {
  CreateOrderBody,
  OrderItem,
  OrderItemBody,
} from '../domain/order.entity';
import { IOrderRepository } from '../domain/order.repository.interface';
import { IBaseResponse } from '@/shared/_common/entity/base-response.model';

export type ICreateOrderUseCase = ReturnType<typeof createOrderUseCase>;

export const getRequiredIngredients = (
  products: Pick<IProduct, 'ingredients'>[]
) => {
  const ingredientsById: { [id: string]: { quantity: number } } = {};
  for (const product of products) {
    for (const ingredient of product.ingredients) {
      if (!ingredientsById[ingredient.id]) {
        ingredientsById[ingredient.id] = { quantity: ingredient.quantity };
      } else {
        ingredientsById[ingredient.id].quantity += ingredient.quantity;
      }
    }
  }
  return ingredientsById;
};

export const getOrderItems = (products: IProduct[], items: OrderItemBody[]) => {
  const _items: OrderItem[] = [];
  for (const productOrder of items) {
    for (const product of products) {
      if (productOrder.productId === product.id) {
        _items.push({
          productId: product.id,
          productPrice: product.price,
          quantity: productOrder.quantity,
        });
      }
    }
  }
  return _items;
};

export const createOrderUseCase =
  (
    orderRepository: IOrderRepository,
    productRepository: IProductRepository,
    inventoryRepository: IInventoryRepository
  ) =>
  async (body: CreateOrderBody, userId: string): Promise<IBaseResponse> => {
    try {
      const productsId = body.items.map((item) => item.productId);

      const products = await Promise.all(
        productsId.map((productId) => {
          return productRepository.getProductByIdForUser(productId, userId);
        })
      );

      if (products.some((product) => product === null)) {
        return {
          ...ResponseCode['NOT FOUND'],
          message: 'Product not found',
        };
      }

      const requiredIngr = getRequiredIngredients(products as IProduct[]);
      const requiredIngrIds = Object.keys(requiredIngr);
      const ingredients = await Promise.all(
        requiredIngrIds.map((id) => {
          return inventoryRepository.getItemByIdForUser(id, userId);
        })
      );

      if (ingredients.some((ingr) => ingr === null)) {
        return {
          ...ResponseCode['NOT FOUND'],
          message: 'Ingredient not found',
        };
      }

      const _ingredients = ingredients as InventoryItem[];
      const isStockInsufficient = _ingredients.some(
        (ingr) => ingr.stock < requiredIngr[ingr.id].quantity
      );

      if (isStockInsufficient) {
        return {
          ...ResponseCode['BAD REQUEST'],
          message: 'No hay suficientes insumos',
        };
      }

      await Promise.all(
        _ingredients.map(async (ingr) => {
          await inventoryRepository.updateItemForUser(
            ingr.id,
            {
              stock: ingr.stock - requiredIngr[ingr.id].quantity,
            },
            userId
          );
        })
      );

      const items = getOrderItems(products as IProduct[], body.items);
      const totalAmount = items.reduce((acc: number, item) => {
        return acc + item.productPrice * item.quantity;
      }, 0);

      await orderRepository.createOrder({
        id: GeneralUtils.generateId(),
        items,
        totalAmount,
        date: new Date(),
        organizationId: userId,
      });

      return {
        ...ResponseCode['OK'],
        message: 'Orden creada',
      };
    } catch (e: unknown) {
      if (e instanceof Error) console.log('Error', e.message);
      return {
        ...ResponseCode['INTERNAL SERVER ERROR'],
        message: 'Unexpected error',
      };
    }
  };
