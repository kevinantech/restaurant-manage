import { IProductEntry } from "@/backend/modules/product-entry/domain/product-entry.entity";
import { API } from "@/frontend/common/constants/api-enum";
import { ServerResponse } from "@/frontend/common/server-response";
import { useEffect, useMemo, useState } from "react";

type R = ServerResponse<IProductEntry[]>;
type IndexedInventoryItem = Record<
  string,
  Omit<IProductEntry, "id" | "category" | "stock">
>;
const fetcher = () => fetch(API.INVENTORY, { method: "GET" });

const useInventory = () => {
  const [inventory, setInventory] = useState<IProductEntry[]>([]);

  const indexedInventory = useMemo<IndexedInventoryItem>(
    () =>
      inventory.reduce((acc, i) => {
        acc[i.id] = {
          name: i.name,
          unitOfMeasure: i.unitOfMeasure,
          unitWeight: i.unitWeight,
        };
        return acc;
      }, {} as IndexedInventoryItem),
    [inventory]
  );

  const handleInventory = async () => {
    const response: R = await fetcher().then(async (res) => await res.json());
    if (response.data) setInventory(response.data);
  };

  useEffect(() => {
    handleInventory();
  }, []);

  return {
    inventory,
    indexedInventory,
  };
};

export { useInventory };
