import { getOrdersUseCase } from '@/order/application/get-orders.uc';
import { OrderRepository } from '@/order/infrastructure/order.repository';
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
    const getOrders = getOrdersUseCase(new OrderRepository());
    const res = await getOrders(user.id);
    return new ResponseFactory(res).Ok();
  } catch (error) {
    return new RouteErrorHandler(error).handle();
  }
}
