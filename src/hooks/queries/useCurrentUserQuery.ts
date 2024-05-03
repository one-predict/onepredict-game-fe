import { useQuery } from '@tanstack/react-query';
import { useUserApi } from '../../providers/ApiServiceProvider';
import { useCallback } from 'react';

const useCurrentUserQuery = () => {
  const userApi = useUserApi();

  const getCurrentUserFn = useCallback(() => userApi.getCurrentUser(), [userApi]);

  return useQuery({ queryKey: ['current-user'], queryFn: getCurrentUserFn });
};

export default useCurrentUserQuery;
