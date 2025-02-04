import { ISale } from "@/backend/modules/sale/domain/sale.entity";
import { API } from "@/frontend/common/constants/api-enum";
import { ServerResponse } from "@/frontend/common/server-response";
import { useEffect, useState } from "react";

type R = ServerResponse<ISale[]>;
const fetcher = () => fetch(API.SALE, { method: "GET" });

const useSales = () => {
  const [sales, setSales] = useState<ISale[]>([]);

  const handleSales = async () => {
    const response: R = await fetcher().then(async (res) => await res.json());
    if (response.data) setSales(response.data);
  };

  useEffect(() => {
    handleSales();
  }, []);

  return {
    sales,
  };
};

export { useSales };
