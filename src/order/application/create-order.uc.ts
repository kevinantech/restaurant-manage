import { IInventoryRepository } from '@/inventory/domain/inventory.repository.interface';
import { Product, ProductRecipe } from '@/product/domain/product.entity';
import { IProductRepository } from '@/product/domain/product.repository.interface';
import { ResponseCode } from '@/shared/_common/constants/response-codes';
import { IBaseResponse } from '@/shared/entity/base-response';
import {
  CreateOrderBody,
  OrderProduct,
  OrderProductBody,
} from '../domain/order.entity';
import { IOrderRepository } from '../domain/order.repository.interface';

export type ICreateOrderUseCase = ReturnType<typeof createOrderUseCase>;
type ExtendedOrderProduct = OrderProduct & { recipe: ProductRecipe[] };
type IngredientsById = { [id: string]: { quantity: number } };
type ProductComposition = { recipe: ProductRecipe[]; quantity: number };

export const getExtendedOrderProducts = (
  productsFromRepo: Product[],
  productsFromBody: OrderProductBody[]
): ExtendedOrderProduct[] => {
  const result: ExtendedOrderProduct[] = [];
  for (const productBody of productsFromBody) {
    for (const productRepo of productsFromRepo) {
      if (productBody.id === productRepo.id) {
        result.push({
          id: productRepo.id,
          recipe: productRepo.recipe,
          quantity: productBody.quantity,
          unitPrice: productRepo.price,
        });
      }
    }
  }
  return result;
};

export const getOrderIngredients = (
  products: ProductComposition[]
): IngredientsById => {
  const ingredientsById: IngredientsById = {};
  for (const product of products) {
    for (const ingredient of product.recipe) {
      if (!ingredientsById[ingredient.id]) {
        ingredientsById[ingredient.id] = {
          quantity: ingredient.quantity * product.quantity,
        };
      } else {
        ingredientsById[ingredient.id].quantity +=
          ingredient.quantity * product.quantity;
      }
    }
  }
  return ingredientsById;
};

export const createOrderUseCase =
  (
    orderRepository: IOrderRepository,
    productRepository: IProductRepository,
    inventoryRepository: IInventoryRepository
  ) =>
  async (body: CreateOrderBody, userId: string): Promise<IBaseResponse> => {
    try {
      const productsFound = (
        await Promise.all(
          body.products.map((product) => {
            return productRepository.getProductById(product.id);
          })
        )
      ).filter((product) => !!product);

      if (productsFound.some((product) => product.userId !== userId)) {
        return {
          ...ResponseCode['FORBIDDEN'],
          message: 'No tienes permisos para crear esta orden',
        };
      }

      if (productsFound.length !== body.products.length) {
        return {
          ...ResponseCode['NOT FOUND'],
          message: 'Uno o más productos no estan disponibles',
        };
      }

      const extendedOrderProducts = getExtendedOrderProducts(
        productsFound,
        body.products
      );

      const requiredIngredients = getOrderIngredients(extendedOrderProducts);
      const requiredIngredientsIds = Object.keys(requiredIngredients);
      const ingredients = (
        await Promise.all(
          requiredIngredientsIds.map((id) =>
            inventoryRepository.getItemById(id)
          )
        )
      ).filter((ingr) => !!ingr);

      if (ingredients.length !== requiredIngredientsIds.length) {
        return {
          ...ResponseCode['BAD REQUEST'],
          message: 'Error al obtener los insumos',
        };
      }

      const isStockInsufficient = ingredients.some(
        (ingr) => ingr.stock < requiredIngredients[ingr.id].quantity
      );

      if (isStockInsufficient) {
        return {
          ...ResponseCode['BAD REQUEST'],
          message: 'No hay suficientes insumos',
        };
      }

      const totalAmount = extendedOrderProducts.reduce(
        (acc: number, { unitPrice, quantity }) => {
          return acc + unitPrice * quantity;
        },
        0
      );

      await Promise.all(
        ingredients.map((ingr) => {
          return inventoryRepository.updateItem(ingr.id, {
            stock: ingr.stock - requiredIngredients[ingr.id].quantity,
          });
        })
      );

      await orderRepository.createOrder({
        products: extendedOrderProducts.map((product) => ({
          id: product.id,
          quantity: product.quantity,
          unitPrice: product.unitPrice,
        })),
        totalAmount,
        userId,
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
