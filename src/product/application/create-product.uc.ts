import { InventoryItemRepository } from '@/inventory/domain/inventory-item.repository';
import { ResponseCode } from '@/shared/_common/constants/response-codes';
import { IBaseResponse } from '@/shared/_common/entity/base-response.model';
import { GeneralUtils } from 'utils/general.util';
import { ProductRepository } from '../domain/product.repository';
import { Product } from '../domain/product.value';
import { CreateProductDto } from './dto/create-product.dto';
import { SystemUserRepository } from '@/shared/systemuser/domain/systemuser.repository';

export class CreateProduct {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly inventoryItemRepository: InventoryItemRepository,
    private readonly userRepository: SystemUserRepository
  ) {}
  async create(data: CreateProductDto): Promise<IBaseResponse> {
    const userExists = await this.userRepository.findUserById(data.userId);
    if (!userExists) {
      return {
        ...ResponseCode.UNAUTHORIZED,
        message: 'Acceso denegado',
      };
    }

    const registeredIngredients = (
      await this.inventoryItemRepository.getItemsForUser(data.userId)
    ).map(({ id }) => id);

    if (!data.ingredients.every(({ id }) => registeredIngredients.includes(id)))
      return {
        ...ResponseCode['BAD REQUEST'],
        message: 'Uno o más ingredientes no están disponibles',
      };

    const product = new Product(
      GeneralUtils.generateId(),
      data.name,
      data.description,
      data.ingredients,
      data.price,
      data.userId
    );
    await this.productRepository.createProduct(product);
    return {
      ...ResponseCode.OK,
      message: 'Producto agregado',
    };
  }
}
