import { useQuery } from '@tanstack/react-query';
import { useUserApi } from '@providers/ApiProvider';

const useCurrentUserReferalsQuery = () => {
  const userApi = useUserApi();

  return useQuery({
    queryKey: ['current-user-referals'],
    queryFn: () => userApi.getCurrentUserReferals(),
  });
};

export default useCurrentUserReferalsQuery;
