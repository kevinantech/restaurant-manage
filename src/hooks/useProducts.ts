import { IProduct } from "@/backend/modules/product/domain/product.entity";
import { API } from "@/common/constants/api-enum";
import { ServerResponse } from "@/common/interfaces";
import { useEffect, useState } from "react";

type R = ServerResponse<IProduct[]>;
const fetcher = () => fetch(API.PRODUCT, { method: "GET" });

const useProducts = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  const handleProducts = async () => {
    const response: R = await fetcher().then(async (res) => await res.json());
    if (response.data) setProducts(response.data);
  };

  useEffect(() => {
    handleProducts();
  }, []);

  return {
    products,
  };
};

export { useProducts };
