import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { DefaultError, useMutation, useQueryClient } from '@tanstack/react-query';
import { usePortfolioApi } from '@providers/ApiProvider';
import { Portfolio } from '@api/PortfolioApi';

const useApplyCardsToPortfolioMutation = () => {
  const portfolioApi = usePortfolioApi();

  const queryClient = useQueryClient();

  const handleMutationSuccess = useCallback(
    async (portfolio: Portfolio) => {
      const promises: Array<Promise<unknown>> = [queryClient.invalidateQueries({ queryKey: ['portfolios'] })];

      if (portfolio.tournamentId) {
        promises.push(
          queryClient.invalidateQueries({
            queryKey: ['tournament-decks', { tournamentId: portfolio.tournamentId, my: true }],
          }),
        );
      }

      await Promise.all(promises);

      toast('Cards have been successfully applied to the portfolio.');
    },
    [queryClient],
  );

  return useMutation<Portfolio, DefaultError, { id: string; cardsStack: Record<string, number> }>({
    mutationFn: (params) => portfolioApi.applyGameCards(params.id, params.cardsStack),
    onSuccess: handleMutationSuccess,
  });
};

export default useApplyCardsToPortfolioMutation;
