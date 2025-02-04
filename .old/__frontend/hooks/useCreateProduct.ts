import { CreateProductDto } from "@/backend/modules/product/application/dto/create-product.dto";
import { API } from "@/frontend/common/constants/api-enum";
import { useState } from "react";

const fetcher = (data: CreateProductDto) =>
  fetch(API.PRODUCT, {
    method: "POST",
    body: JSON.stringify(data),
  });

const useCreateProduct = () => {
  const [error, setError] = useState<{ message: string }>();
  const [loading, setLoading] = useState<boolean>(false);
  const toggleLoading = () => setLoading((prevState) => !prevState);

  const handleCreate = async (data: CreateProductDto) => {
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

export { useCreateProduct };
