import { Product } from '@/product/domain/product.entity';
import { IProductRepository } from '@/product/domain/product.repository.interface';
import { ResponseBodyFactory } from 'lib/http/response-body.factory';
import { IOrderRepository } from '../domain/order.repository.interface';
import { OrderWithExtendedProducts } from '../domain/order.entity';

export type IGetOrdersUseCase = ReturnType<typeof getOrdersUseCase>;

export const getOrdersUseCase =
  (orderRepository: IOrderRepository, productRepository: IProductRepository) =>
  async (userId: string, page: number, limit: number) => {
    const queryResult = await orderRepository.getOrdersForUser(
      { userId },
      page,
      limit
    );

    const totalDocuments = await orderRepository.getTotalOrdersForUser({
      userId,
    });

    const _products = [...queryResult[0]?.products];

    for (let i = 1; i < queryResult.length; i++) {
      for (const product of queryResult[i].products) {
        let isDuplicated = false;
        for (const _product of _products) {
          if (_product.id === product.id) {
            isDuplicated = true;
            break;
          }
        }
        if (!isDuplicated) _products.push(product);
      }
    }

    const products = await Promise.all(
      _products.map(async ({ id }) => productRepository.getProductById(id))
    );

    const productsById = products.reduce((acc, product) => {
      if (product) acc[product.id] = product;
      return acc;
    }, {} as { [id: string]: Product });

    const orders = queryResult.map((order) => ({
      ...order,
      products: order.products.map((product) => ({
        id: product.id,
        name: productsById[product.id]?.name,
        quantity: product.quantity,
        unitPrice: product.unitPrice,
      })),
    }));

    return ResponseBodyFactory.success<OrderWithExtendedProducts[]>({
      data: orders,
      pagination: {
        pageIndex: page,
        pageSize: queryResult.length,
        totalDocuments: totalDocuments,
        totalPages: Math.ceil(totalDocuments / limit),
      },
    });
  };
