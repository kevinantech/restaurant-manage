import { getInventoryItemsUseCase } from '@/inventory/application/get-inventory-items.uc';
import { InventoryItemRepository } from '@/inventory/infraestructure/inventory-item.repository';
import { AuthenticationError } from 'lib/errors/authentication.error';
import { RouteErrorHandler } from 'lib/handlers/error.handler';
import { dbConnect } from 'lib/mongoose/connect';
import { session } from 'lib/next-auth/session.server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const user = await session();
    if (!user) throw new AuthenticationError();

    await dbConnect();
    const itemsRepository = new InventoryItemRepository();
    const getInventoryItems = getInventoryItemsUseCase(itemsRepository);
    const res = await getInventoryItems(user.id);
    return NextResponse.json({ ...res });
  } catch (error) {
    return new RouteErrorHandler(error).handle();
  }
}
