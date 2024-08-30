import { useCallback } from 'react';
import { DefaultError, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthApi } from '@providers/ApiProvider';
import { SignInParams } from '@api/AuthApi';

const useSignInMutation = () => {
  const authApi = useAuthApi();

  const queryClient = useQueryClient();

  const handleMutationSuccess = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: ['current-user'] });
  }, [queryClient]);

  return useMutation<void, DefaultError, SignInParams>({
    mutationFn: (params: SignInParams) => authApi.signIn(params),
    onSuccess: handleMutationSuccess,
  });
};

export default useSignInMutation;
