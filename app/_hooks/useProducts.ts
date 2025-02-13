import { IProduct } from '@/product/domain/product.entity';
import { IBaseResponse } from '@/shared/_common/entity/base-response.model';
import { ApiRoutes } from 'app/_common/constants';
import { useMemo } from 'react';
import useSWR from 'swr';

type ProductsResponse = IBaseResponse<IProduct[]>;
type IndexedProducts = Record<string, Pick<IProduct, 'name' | 'price'>>;
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const useProducts = () => {
  const { data: response } = useSWR<ProductsResponse>(
    ApiRoutes.PRODUCTS,
    fetcher
  );

  const indexedProducts = useMemo<IndexedProducts | undefined>(() => {
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
    indexedProducts,
  };
};

export { useProducts };
