import { IProduct } from "@/backend/modules/product/domain/product.entity";
import { API } from "@/frontend/common/constants/api-enum";
import { ServerResponse } from "@/frontend/common/server-response";
import { useEffect, useMemo, useState } from "react";

type R = ServerResponse<IProduct[]>;
type IndexedProducts = Record<string, Pick<IProduct, "name" | "price">>;
const fetcher = () => fetch(API.PRODUCT, { method: "GET" });

const useProducts = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  const indexedProducts = useMemo<IndexedProducts>(
    () =>
      products.reduce((acc, p) => {
        acc[p.id] = {
          name: p.name,
          price: p.price,
        };
        return acc;
      }, {} as IndexedProducts),
    [products]
  );

  const handleProducts = async () => {
    const response: R = await fetcher().then(async (res) => await res.json());
    if (response.data) setProducts(response.data);
  };

  useEffect(() => {
    handleProducts();
  }, []);

  return {
    products,
    indexedProducts,
  };
};

export { useProducts };
