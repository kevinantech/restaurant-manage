import { AdminDatabase } from '@/admin/infrastructure/admin.database';
import { CreateInventoryItem } from '@/inventory/application/create-inventory-item.uc';
import { CreateInventoryItemDto } from '@/inventory/application/dto/create-inventory-item.dto';
import { GetInventoryItems } from '@/inventory/application/get-inventory-items.uc';
import { InventoryItemDatabase } from '@/inventory/infraestructure/inventory-item.database';
import { ResponseModel } from '@/shared/_common/entity/base-response.model';
import { connectDB } from 'lib/mongoose/connect';
import { session } from 'lib/nextauth/session.server';
import { NextRequest, NextResponse } from 'next/server';
import { findFormatError } from 'utils/helpers/validation.helper';

const adminDatabase = new AdminDatabase();
const inventoryItemsRepo = new InventoryItemDatabase();
const createInventoryItem = new CreateInventoryItem(
  adminDatabase,
  inventoryItemsRepo
);
const getInventoryItems = new GetInventoryItems(inventoryItemsRepo);

export async function GET(req: NextRequest) {
  const user = await session();
  if (user.status == 'unauthenticated') {
    return NextResponse.json({ ...user.data }, { status: user.data.status });
  }
  await connectDB();
  const res = await getInventoryItems.get(user.data.id);
  return NextResponse.json({ ...res }, { status: res.status });
}

export async function POST(req: NextRequest): Promise<ResponseModel> {
  const input = await req.json();
  const user = await session();
  if (user.status == 'unauthenticated') {
    return NextResponse.json({ ...user.data }, { status: user.data.status });
  }

  const _input = { ...input, userId: user.data.id };

  const formatError = await findFormatError(CreateInventoryItemDto, _input);
  if (formatError)
    return NextResponse.json(
      { ...formatError },
      { status: formatError.status }
    );

  await connectDB();
  const res = await createInventoryItem.create(
    _input as CreateInventoryItemDto
  );
  return NextResponse.json({ ...res }, { status: res.status });
}
