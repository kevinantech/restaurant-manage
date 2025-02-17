import { connectDB } from 'lib/mongoose/connect';
import { InventoryItemRepository } from '../infraestructure/inventory-item.repository';
import { getInventoryItemsUseCase } from './get-inventory-items.uc';

describe('get-inventory-item.uc', () => {
  it('should get the inventory items', async () => {
    const itemsRepository = new InventoryItemRepository();
    await connectDB();
    const getInventoryItems = getInventoryItemsUseCase(itemsRepository);
    const result = await getInventoryItems('67b2c5e6c35d6664693ac80b');
    expect(result.data).toBeDefined();
  });
});
