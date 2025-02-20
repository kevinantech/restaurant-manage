import { Order } from '@/order/domain/order.entity';
import { ApiRoutes } from 'app/routes.config';
import { ResponseBody } from 'lib/http/response-body.factory';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const useOrders = () => {
  const { data: response } = useSWR<ResponseBody<Order[]>>(
    ApiRoutes.ORDERS,
    fetcher
  );

  return {
    orders: response?.data ?? [],
  };
};

export { useOrders };
