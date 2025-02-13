import { ResponseCode } from '@/shared/_common/constants/response-codes';
import { IBaseResponse } from '@/shared/_common/entity/base-response.model';
import { GeneralUtils } from 'utils/general.util';
import { InventoryItemRepository } from '../domain/inventory-item.repository';
import { InventoryItem } from '../domain/inventory-item.value';
import { CreateInventoryItemDto } from './dto/create-inventory-item.dto';
import { SystemUserRepository } from '@/shared/systemuser/domain/systemuser.repository';

export class CreateInventoryItem {
  constructor(
    private readonly userRepository: SystemUserRepository,
    private readonly itemRepository: InventoryItemRepository
  ) {}

  async create(data: CreateInventoryItemDto): Promise<IBaseResponse> {
    const userExists = await this.userRepository.findUserById(data.userId);
    if (!userExists) {
      return {
        ...ResponseCode['BAD REQUEST'],
        message: 'User not found',
      };
    }

    const item = new InventoryItem(
      GeneralUtils.generateId(),
      data.name,
      data.unitOfMeasure,
      data.unitPrice,
      data.stock,
      data.userId
    );

    await this.itemRepository.createItem(item);
    return {
      ...ResponseCode.OK,
      message: 'Inventario agregado',
    };
  }
}
