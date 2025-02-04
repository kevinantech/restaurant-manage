import { IOrder } from "@/backend/modules/order/domain/order.entity";
import { ServerResponse } from "@/frontend/common/server-response";
import { API } from "@/frontend/common/constants/api-enum";
import { useEffect, useState } from "react";

type R = ServerResponse<IOrder[]>;
const fetcher = () => fetch(API.ORDER, { method: "GET" });

const useOrders = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);

  const handleOrders = async () => {
    const response: R = await fetcher().then(async (res) => await res.json());
    if (response.data) setOrders(response.data);
  };

  useEffect(() => {
    handleOrders();
  }, []);

  return {
    orders,
  };
};

export { useOrders };
