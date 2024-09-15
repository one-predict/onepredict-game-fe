import { useQuery } from '@tanstack/react-query';
import { useUserApi } from '@providers/ApiProvider';
import { delay } from '@utils/delay';

const CURRENT_USER_FETCH_PROLONG_TIME = 1000;

const useCurrentUserQuery = () => {
  const userApi = useUserApi();

  return useQuery({
    queryKey: ['current-user'],
    queryFn: async () => {
      const [user] = await Promise.all([userApi.getCurrentUser(), delay(CURRENT_USER_FETCH_PROLONG_TIME)]);

      return user;
    },
  });
};

export default useCurrentUserQuery;
