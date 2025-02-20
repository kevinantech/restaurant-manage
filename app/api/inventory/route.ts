import { getInventoryItemsUseCase } from '@/inventory/application/get-inventory-items.uc';
import { InventoryItemRepository } from '@/inventory/infraestructure/inventory-item.repository';
import { AuthenticationError } from 'lib/errors/authentication.error';
import { RouteErrorHandler } from 'lib/handlers/error.handler';
import { ResponseFactory } from 'lib/http/response.factory';
import { dbConnect } from 'lib/mongoose/connect';
import { session } from 'lib/next-auth/session.server';

export async function GET() {
  try {
    const user = await session();
    if (!user) throw new AuthenticationError();

    await dbConnect();
    const itemsRepository = new InventoryItemRepository();
    const getInventoryItems = getInventoryItemsUseCase(itemsRepository);
    const res = await getInventoryItems(user.id);
    return new ResponseFactory(res).Ok();
  } catch (error) {
    return new RouteErrorHandler(error).handle();
  }
}
