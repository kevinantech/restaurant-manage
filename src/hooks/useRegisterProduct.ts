import { P } from "@/app/admin/products/add/page";
import { IProduct } from "@/backend/modules/product/domain/product.entity";
import { API } from "@/common/constants/api-enum";
import { ServerResponse } from "@/common/interfaces/server-response";
import { useState } from "react";

type R = ServerResponse<IProduct>;
const fetcher = (data: P) =>
  fetch(API.PRODUCT, {
    method: "POST",
    body: JSON.stringify(data),
  });

const useRegisterProduct = () => {
  const [error, setError] = useState<{ message: string }>();
  const [loading, setLoading] = useState<boolean>(false);
  const toggleLoading = () => setLoading((prevState) => !prevState);

  const handleRegister = async (data: P) => {
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

export { useRegisterProduct };
