import dotenv from 'dotenv';
import { dbConnect } from 'lib/mongoose/connect';
import { InventoryItemRepository } from '../infraestructure/inventory-item.repository';
import { getInventoryItemsUseCase } from './get-inventory-items.uc';
dotenv.config({ path: '.env.local' });

/**
 * For interactions with mongoose using jest.
 * Sets in jest.config.ts the next config:
 * jestEnvironment: "node"
 * @watch jest.config.ts
 */
describe('get-inventory-item.uc', () => {
  it('should get the inventory items', async () => {
    await dbConnect();
    const itemsRepository = new InventoryItemRepository();
    const getInventoryItems = getInventoryItemsUseCase(itemsRepository);
    const result = await getInventoryItems('67b1203fbd49c25ba71dfb52');
    expect(result.data?.length).toBeGreaterThan(0);
  });
});
