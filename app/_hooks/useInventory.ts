import { IInventoryItem } from '@/inventory/domain/inventory-item.entity';
import { IBaseResponse } from '@/shared/_common/entity/base-response.model';
import { ApiRoutes } from 'app/_common/constants';
import { useMemo } from 'react';
import useSWR from 'swr';

type InventoryItemsResponse = IBaseResponse<IInventoryItem[]>;
type IndexedInventoryItem = Record<
  string,
  Pick<IInventoryItem, 'name' | 'unitOfMeasure' | 'unitPrice' | 'stock'>
>;
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const useInventory = () => {
  const { data: response } = useSWR<InventoryItemsResponse>(
    ApiRoutes.INVENTORY,
    fetcher
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const inventory = response?.data ?? [];

  const inventoryById = useMemo<IndexedInventoryItem>(() => {
    return inventory.reduce((acc, i) => {
      acc[i.id] = {
        name: i.name,
        unitOfMeasure: i.unitOfMeasure,
        unitPrice: i.unitPrice,
        stock: i.stock,
      };
      return acc;
    }, {} as IndexedInventoryItem);
  }, [inventory]);

  return {
    inventory,
    inventoryById,
  };
};

export { useInventory };
