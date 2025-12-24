import { getOrdersUseCase } from '@/order/application/get-orders.uc';
import { OrderRepository } from '@/order/infrastructure/order.repository';
import { ProductRepository } from '@/product/infrastructure/product.repository';
import { AuthenticationError } from 'lib/errors/authentication.error';
import { ValidationError } from 'lib/errors/validation.error';
import { RouteErrorHandler } from 'lib/handlers/error.handler';
import { dbConnect } from 'lib/mongoose/connect';
import { session } from 'lib/next-auth/session.server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const user = await session();
    if (!user) throw new AuthenticationError();

    const params = request.nextUrl.searchParams;
    const page = parseInt(params.get('page') || '1');
    const limit = parseInt(params.get('limit') || '10');
    if (page <= 0) throw new ValidationError('Page must be greater than 0');
    if (limit <= 0) throw new ValidationError('Limit must be greater than 0');

    await dbConnect();
    const getOrders = getOrdersUseCase(
      new OrderRepository(),
      new ProductRepository()
    );
    const res = await getOrders(user.id, page, limit);
    return NextResponse.json({ ...res });
  } catch (error) {
    return new RouteErrorHandler(error).handle();
  }
}
