import { GetProducts } from '@/product/application/get-products.uc';
import { ProductDatabase } from '@/product/infrastructure/product.database';
import { connectDB } from 'lib/mongoose/connect';
import { session } from 'lib/nextauth/session.server';
import { NextRequest, NextResponse } from 'next/server';

const productRepository = new ProductDatabase();
const getProducts = new GetProducts(productRepository);

export async function GET(req: NextRequest) {
  const user = await session();
  if (user.status == 'unauthenticated') {
    return NextResponse.json({ ...user.error }, { status: user.error.status });
  }
  await connectDB();
  const res = await getProducts.get(user.data.id);
  return NextResponse.json({ ...res }, { status: res.status });
}
