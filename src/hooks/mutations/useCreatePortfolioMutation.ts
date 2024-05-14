import { useCallback } from 'react';
import {
  DefaultError,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { usePortfolioApi } from '@providers/ApiProvider';
import { CreatePortfolioParams, Portfolio } from '@api/PortfolioApi';

const useCreatePortfolioMutation = () => {
  const portfolioApi = usePortfolioApi();

  const queryClient = useQueryClient();

  const handleMutationSuccess = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: ['portfolios'] });
  }, [queryClient]);

  return useMutation<Portfolio, DefaultError, CreatePortfolioParams>({
    mutationFn: (params: CreatePortfolioParams) => portfolioApi.createPortfolio(params),
    onSuccess: handleMutationSuccess,
  });
};

export default useCreatePortfolioMutation;
