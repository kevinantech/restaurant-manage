import { CreateOrderDto } from "@/backend/modules/order/application/dto/create-order.dto";
import { API } from "@/frontend/common/constants/api-enum";
import { useState } from "react";

const fetcher = (data: CreateOrderDto) =>
  fetch(API.ORDER, {
    method: "POST",
    body: JSON.stringify(data),
  });

const useCreateOrder = () => {
  const [error, setError] = useState<{ message: string }>();
  const [loading, setLoading] = useState<boolean>(false);
  const toggleLoading = () => setLoading((prevState) => !prevState);

  const handleCreate = async (data: CreateOrderDto) => {
    try {
      toggleLoading();
      await fetcher(data).then(async (res) => await res.json());
    } catch (e: any) {
      console.warn(e.message);
    } finally {
      toggleLoading();
    }
  };

  return { handleCreate, loading, error, setError };
};

export { useCreateOrder };
