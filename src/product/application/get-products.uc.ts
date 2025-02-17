import { ResponseCode } from '@/shared/_common/constants/response-codes';
import { IBaseResponse } from '@/shared/_common/entity/base-response.model';
import { IProduct } from '../domain/product.entity';
import { IProductRepository } from '../domain/product.repository.interface';

export class GetProducts {
  constructor(private readonly productRepository: IProductRepository) {}

  async get(userId: string): Promise<IBaseResponse<IProduct[]>> {
    const products = await this.productRepository.getProductsForUser(userId);
    return {
      ...ResponseCode.OK,
      data: products,
      message: 'Consulta exitosa',
    };
  }
}
