import { useQuery } from '@tanstack/react-query';
import { useUserApi } from '@providers/ApiProvider';

const useCurrentUserRank = () => {
  const userApi = useUserApi();

  return useQuery({
    queryKey: ['current-user-rank'],
    queryFn: () => userApi.getCurrentUserRank(),
    refetchInterval: false,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export default useCurrentUserRank;
