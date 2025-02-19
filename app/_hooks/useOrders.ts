import { Order } from '@/order/domain/order.entity';
import { IBaseResponse } from '@/shared/entity/base-response';
import { ApiRoutes } from 'app/routes.config';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const useOrders = () => {
  const { data: response } = useSWR<IBaseResponse<Order[]>>(
    ApiRoutes.ORDERS,
    fetcher
  );

  return {
    orders: response?.data ?? [],
  };
};

export { useOrders };
