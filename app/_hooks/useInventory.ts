import { IInventoryItem } from '@/inventory/domain/inventory-item.entity';
import { IBaseResponse } from '@/shared/_common/entity/base-response.model';
import { ApiRoutes } from 'app/_common/constants';
import { UserSession } from 'app/api/auth/[...nextauth]/route';
import { useSession } from 'next-auth/react';
import { useMemo } from 'react';
import useSWR from 'swr';

type IndexedInventoryItem = Record<
  string,
  Pick<IInventoryItem, 'name' | 'unitOfMeasure' | 'unitWeight'>
>;
const fetcher = (url: string) => fetch(url).then((res) => res.json());

type InventoryItemsResponse = IBaseResponse<IInventoryItem[]>;

const useInventory = () => {
  const { data: session } = useSession();
  const user = session?.user as UserSession | undefined;
  const URL = useMemo(
    () => (user?.id ? `${ApiRoutes.INVENTORY}?userId=${user.id}` : ''),
    [user?.id]
  );
  const { data: response } = useSWR<InventoryItemsResponse>(URL, fetcher);

  const indexedInventory = useMemo<IndexedInventoryItem | undefined>(() => {
    return response?.data?.reduce((acc, i) => {
      acc[i.id] = {
        name: i.name,
        unitOfMeasure: i.unitOfMeasure,
        unitWeight: i.unitWeight,
      };
      return acc;
    }, {} as IndexedInventoryItem);
  }, [response?.data]);

  return {
    inventory: response?.data,
    indexedInventory,
  };
};

export { useInventory };
