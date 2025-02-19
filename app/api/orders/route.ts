import { getOrdersUseCase } from '@/order/application/get-orders.uc';
import { OrderRepository } from '@/order/infrastructure/order.repository';
import { Response } from '@/shared/entity/base-response';
import { dbConnect } from 'lib/mongoose/connect';
import { session } from 'lib/next-auth/session.server';
import { NextResponse } from 'next/server';

export async function GET() {
  const user = await session();
  if (user.status === 'unauthenticated') {
    return NextResponse.json({ ...user.error }, { status: user.error.status });
  }
  await dbConnect();
  const getOrders = getOrdersUseCase(new OrderRepository());
  const result = await getOrders(user.data.id);
  return NextResponse.json({ ...result }, { status: result.status });
}
