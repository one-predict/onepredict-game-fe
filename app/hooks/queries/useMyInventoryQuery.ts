import { useQuery } from '@tanstack/react-query';
import { useUserInventoryApi } from '@providers/ApiProvider';

const useMyInventoryQuery = () => {
  const userInventoryApi = useUserInventoryApi();

  return useQuery({
    queryKey: ['inventories', 'my'],
    queryFn: () => userInventoryApi.getMyInventory(),
  });
};

export default useMyInventoryQuery;
