import { getProductsUseCase } from '@/product/application/get-products.uc';
import { ProductRepository } from '@/product/infrastructure/product.repository';
import { dbConnect } from 'lib/mongoose/connect';
import { session } from 'lib/next-auth/session.server';
import { NextResponse } from 'next/server';

const productRepository = new ProductRepository();

export async function GET() {
  const user = await session();
  if (user.status == 'unauthenticated') {
    return NextResponse.json({ ...user.error }, { status: user.error.status });
  }
  await dbConnect();
  const getProducts = getProductsUseCase(productRepository);
  const res = await getProducts(user.data.id);
  return NextResponse.json({ ...res }, { status: res.status });
}
