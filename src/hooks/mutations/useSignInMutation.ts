import { useCallback } from 'react';
import {
  DefaultError,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { useAuthApi } from '@providers/ApiProvider';

const useSignInMutation = () => {
  const authApi = useAuthApi();

  const queryClient = useQueryClient();

  const handleMutationSuccess = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: ['current-user'] });
  }, [queryClient]);

  return useMutation<void, DefaultError, string>({
    mutationFn: (signInMessage: string) => authApi.signIn(signInMessage),
    onSuccess: handleMutationSuccess,
  });
};

export default useSignInMutation;
