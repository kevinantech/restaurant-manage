import { getInventoryItemsUseCase } from '@/inventory/application/get-inventory-items.uc';
import { InventoryItemRepository } from '@/inventory/infraestructure/inventory-item.repository';
import { connectDB } from 'lib/mongoose/connect';
import { session } from 'lib/nextauth/session.server';
import { NextResponse } from 'next/server';

const itemsRepository = new InventoryItemRepository();

export async function GET() {
  const user = await session();
  if (user.status == 'unauthenticated') {
    return NextResponse.json({ ...user.error }, { status: user.error.status });
  }

  await connectDB();

  const getInventoryItems = getInventoryItemsUseCase(itemsRepository);

  const res = await getInventoryItems(user.data.id);
  return NextResponse.json({ ...res }, { status: res.status });
}
