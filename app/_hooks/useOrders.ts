import { Order } from '@/order/domain/order.entity';
import { ApiRoutes } from 'app/routes.config';
import { ResponseBody } from 'lib/http/response-body.factory';
import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';

type OrdersResponse = ResponseBody<Order[]>;

const getKey = (pageIndex: number /* , previousPageData: any */) => {
  return `${ApiRoutes.ORDERS}?page=${pageIndex + 1}&limit=10`;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const useOrders = () => {
  const { data: responses } = useSWRInfinite<OrdersResponse>(getKey, fetcher);

  return { responses };
};

export { useOrders };
