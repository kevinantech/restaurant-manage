import { Units } from '@/inventory/domain/units-enum';
import { Product } from '@/product/domain/product.entity';
import { ApiRoutes } from 'app/routes.config';
import { ResponseBody } from 'lib/http/response-body.factory';
import useSWRInfinite from 'swr/infinite';

type ProductsResponse = ResponseBody<
  (Omit<Product, 'recipe'> & {
    recipe: {
      id: string;
      name: string;
      quantity: number;
      unitOfMeasure: Units;
    }[];
  })[]
>;
const getKey = (pageIndex: number /* , previousPageData: any */) => {
  return `${ApiRoutes.PRODUCTS}?page=${pageIndex + 1}&limit=10`;
};
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const useProducts = () => {
  const {
    data: responses,
    size,
    setSize,
  } = useSWRInfinite<ProductsResponse>(getKey, fetcher);
  console.log('🚀 ~ useProducts ~ responses:', responses);

  const handleNext = () => {
    if (
      responses &&
      size < (responses[responses.length - 1]?.pagination?.totalPages ?? 0)
    )
      setSize((prev) => prev + 1);
  };

  return { responses, handleNext };
};

export { useProducts };
