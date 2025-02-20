import { IInventoryRepository } from '@/inventory/domain/inventory.repository.interface';
import { Product, ProductRecipe } from '@/product/domain/product.entity';
import { IProductRepository } from '@/product/domain/product.repository.interface';
import { ConflictError } from 'lib/errors/conflict.error';
import { ForbiddenError } from 'lib/errors/forbidden.error';
import { NotFoundError } from 'lib/errors/not-found.error';
import { ResponseBodyFactory } from 'lib/http/response-body.factory';
import {
  CreateOrderBody,
  InsertOrder,
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
  async (body: CreateOrderBody, userId: string) => {
    const productsFound = (
      await Promise.all(
        body.products.map((product) => {
          return productRepository.getProductById(product.id);
        })
      )
    ).filter((product) => !!product);

    if (productsFound.some((product) => product.userId !== userId)) {
      throw new ForbiddenError('No tienes permisos para crear esta orden');
    }

    if (productsFound.length !== body.products.length) {
      throw new NotFoundError('No fue posible obtener todos los productos');
    }

    const extendedOrderProducts = getExtendedOrderProducts(
      productsFound,
      body.products
    );

    const requiredIngredients = getOrderIngredients(extendedOrderProducts);
    const requiredIngredientsIds = Object.keys(requiredIngredients);
    const ingredients = (
      await Promise.all(
        requiredIngredientsIds.map((id) => inventoryRepository.getItemById(id))
      )
    ).filter((ingr) => !!ingr);

    if (ingredients.length !== requiredIngredientsIds.length) {
      throw new NotFoundError('No fue posible obtener todos los ingredientes');
    }

    if (ingredients.some((ingr) => ingr.userId !== userId)) {
      throw new ForbiddenError('No tienes permisos para crear esta orden');
    }

    const isStockInsufficient = ingredients.some(
      (ingr) => ingr.stock < requiredIngredients[ingr.id].quantity
    );

    if (isStockInsufficient) throw new ConflictError('Stock insuficiente');

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
    } as InsertOrder);

    return ResponseBodyFactory.success({});
  };
