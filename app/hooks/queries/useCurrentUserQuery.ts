import { useQuery } from '@tanstack/react-query';
import { useUserApi } from '@providers/ApiProvider';

const useCurrentUserQuery = () => {
  const userApi = useUserApi();

  return useQuery({
    queryKey: ['current-user'],
    queryFn: () => userApi.getCurrentUser(),
  });
};

export default useCurrentUserQuery;
