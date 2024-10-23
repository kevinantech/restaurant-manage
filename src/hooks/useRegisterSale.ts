import { S } from "@/app/admin/sales/add/page";
import { ISale } from "@/backend/modules/sale/domain/sale.entity";
import { API } from "@/common/constants/api-enum";
import { ServerResponse } from "@/common/interfaces/server-response";
import { useState } from "react";

type R = ServerResponse<ISale>;
const fetcher = (data: S) =>
  fetch(API.SALE, {
    method: "POST",
    body: JSON.stringify(data),
  });

const useRegisterSale = () => {
  const [error, setError] = useState<{ message: string }>();
  const [loading, setLoading] = useState<boolean>(false);
  const toggleLoading = () => setLoading((prevState) => !prevState);

  const handleRegister = async (data: S) => {
    try {
      toggleLoading();
      const response: R = await fetcher(data).then(async (res) => await res.json());
      console.log("🚀 ~ handleRegister ~ response:", response);
    } catch (e: any) {
      console.warn(e.message);
    } finally {
      toggleLoading();
    }
  };

  return {
    handleRegister,
    loading,
    error,
    setError,
  };
};

export { useRegisterSale };
