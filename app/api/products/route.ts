import { getProductsUseCase } from '@/product/application/get-products.uc';
import { ProductRepository } from '@/product/infrastructure/product.repository';
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
    const getProducts = getProductsUseCase(new ProductRepository());
    const res = await getProducts(user.id);
    return NextResponse.json({ ...res });
  } catch (error) {
    return new RouteErrorHandler(error).handle();
  }
}
