import { Product } from '@/product/domain/product.entity';
import { ApiRoutes } from 'app/_common/constants';
import { ResponseBody } from 'lib/http/response-body.factory';
import { useMemo } from 'react';
import useSWR from 'swr';

type ProductsResponse = ResponseBody<Product[]>;
type IndexedProducts = Record<string, Pick<Product, 'name' | 'price'>>;
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const useProducts = () => {
  const { data: response } = useSWR<ProductsResponse>(
    ApiRoutes.PRODUCTS,
    fetcher
  );

  const productsById = useMemo<IndexedProducts | undefined>(() => {
    return response?.data?.reduce((acc, p) => {
      acc[p.id] = {
        name: p.name,
        price: p.price,
      };
      return acc;
    }, {} as IndexedProducts);
  }, [response?.data]);

  return {
    products: response?.data ?? [],
    productsById: productsById ?? {},
  };
};

export { useProducts };
