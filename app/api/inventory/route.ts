import { CreateInventoryItem } from '@/inventory/application/create-inventory-item.uc';
import { CreateInventoryItemDto } from '@/inventory/application/dto/create-inventory-item.dto';
import { GetInventoryItems } from '@/inventory/application/get-inventory-items.uc';
import { InventoryItemDatabase } from '@/inventory/infraestructure/inventory-item.database';
import { ResponseCode } from '@/shared/_common/constants/response-codes';
import { ResponseModel } from '@/shared/_common/entity/base-response.model';
import { isUUID } from 'class-validator';
import { connectDB } from 'lib/mongoose/connect';
import { NextRequest, NextResponse } from 'next/server';
import { findFormatError } from 'utils/helpers/validation.helper';

const inventoryItemsRepo = new InventoryItemDatabase();
const createInventoryItem = new CreateInventoryItem(inventoryItemsRepo);
const getInventoryItems = new GetInventoryItems(inventoryItemsRepo);

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get('userId');

  if (!userId || !isUUID(userId))
    return NextResponse.json(
      {
        ...ResponseCode['BAD REQUEST'],
        message: 'Formato invalido',
      },
      { status: ResponseCode['BAD REQUEST'].status }
    );

  await connectDB();
  const res = await getInventoryItems.get(userId);
  return NextResponse.json({ ...res }, { status: res.status });
}

export async function POST(req: NextRequest): Promise<ResponseModel> {
  const input = await req.json();
  const formatError = await findFormatError(CreateInventoryItemDto, input);
  if (formatError)
    return NextResponse.json(
      { ...formatError },
      { status: formatError.status }
    );
  await connectDB();
  const res = await createInventoryItem.create(input as CreateInventoryItemDto);
  return NextResponse.json({ ...res }, { status: res.status });
}
