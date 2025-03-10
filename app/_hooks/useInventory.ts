import { InventoryItem } from '@/inventory/domain/inventory-item.entity';
import { ApiRoutes } from 'app/routes.config';
import { ResponseBody } from 'lib/http/response-body.factory';
import useSWRInfinite from 'swr/infinite';

type InventoryItemsResponse = ResponseBody<InventoryItem[]>;
const getKey = (pageIndex: number /* , previousPageData: any */) => {
  return `${ApiRoutes.INVENTORY}?page=${pageIndex + 1}&limit=10`;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const useInventory = () => {
  const {
    data: responses,
    size,
    setSize,
  } = useSWRInfinite<InventoryItemsResponse>(getKey, fetcher);

  const handleNext = () => {
    if (
      responses &&
      size < (responses[responses.length - 1]?.pagination?.totalPages ?? 0)
    )
      setSize((prev) => prev + 1);
  };

  return { responses, handleNext };
};

export { useInventory };
