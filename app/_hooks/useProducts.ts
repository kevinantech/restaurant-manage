import { IGetProductUseCase } from '@/product/application/get-products.uc';
import { ApiRoutes } from 'app/routes.config';
import useSWRInfinite from 'swr/infinite';

const getKey = (pageIndex: number /* , previousPageData: any */) => {
  return `${ApiRoutes.PRODUCTS}?page=${pageIndex + 1}&limit=10`;
};
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const useProducts = () => {
  const {
    data: responses,
    size,
    setSize,
  } = useSWRInfinite<Awaited<ReturnType<IGetProductUseCase>>>(getKey, fetcher);
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
