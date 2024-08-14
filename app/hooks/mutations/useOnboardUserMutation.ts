import { useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useUserApi } from '@providers/ApiProvider';

const useOnboardUserMutation = () => {
  const userApi = useUserApi();

  const queryClient = useQueryClient();

  const handleMutate = useCallback(() => {
    queryClient.setQueryData(['current-user'], (previousData) => {
      if (!previousData) {
        return null;
      }

      return {
        ...previousData,
        onboarded: true,
      };
    });
  }, [queryClient]);

  return useMutation<void>({
    mutationFn: () => userApi.finishOnboarding(),
    onMutate: handleMutate,
  });
};

export default useOnboardUserMutation;
