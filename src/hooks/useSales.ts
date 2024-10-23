import { ISale } from "@/backend/modules/sale/domain/sale.entity";
import { API } from "@/common/constants/api-enum";
import { ServerResponse } from "@/common/interfaces";
import { useEffect, useState } from "react";

type R = ServerResponse<ISale[]>;
const fetcher = () => fetch(API.SALE, { method: "GET" });

const useSales = () => {
  const [sales, setSales] = useState<ISale[]>([]);

  const handleProducts = async () => {
    const response: R = await fetcher().then(async (res) => await res.json());
    if (response.data) setSales(response.data);
    console.log("🚀 ~ handleProducts ~ response.data:", response.data);
  };

  useEffect(() => {
    handleProducts();
  }, []);

  return {
    sales,
  };
};

export { useSales };
