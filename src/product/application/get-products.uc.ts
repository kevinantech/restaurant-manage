import { ResponseCode } from '@/shared/_common/constants/response-codes';
import { IBaseResponse } from '@/shared/_common/entity/base-response.model';
import { IProduct } from '../domain/product.entity';
import { ProductRepository } from '../domain/product.repository';

export class GetProducts {
  constructor(private readonly productRepository: ProductRepository) {}

  async get(userId: string): Promise<IBaseResponse<IProduct[]>> {
    const products = await this.productRepository.getProductsByUserId(userId);
    return {
      ...ResponseCode.OK,
      data: products,
      message: 'Consulta exitosa',
    };
  }
}
