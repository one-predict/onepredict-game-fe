import { useCallback } from 'react';
import { DefaultError, useMutation, useQueryClient } from '@tanstack/react-query';
import { usePortfolioCardsDeckApi } from '@providers/ApiProvider';
import { PortfolioCardsDeck, UpdatePortfolioCardsDeckParams } from '@api/PortfolioCardsDeckApi';

const useUpdateCardsDeckMutation = () => {
  const portfolioCardsDeckApi = usePortfolioCardsDeckApi();

  const queryClient = useQueryClient();

  const handleMutationSuccess = useCallback(
    async (updatedDeck: PortfolioCardsDeck) => {
      queryClient.setQueryData(['portfolio-cards-decks', 'my'], updatedDeck);
    },
    [queryClient],
  );

  return useMutation<PortfolioCardsDeck, DefaultError, UpdatePortfolioCardsDeckParams & { id: string }>({
    mutationFn: ({ id, ...updateParams }) => portfolioCardsDeckApi.updatePortfolioCardsDeck(id, updateParams),
    onSuccess: handleMutationSuccess,
  });
};

export default useUpdateCardsDeckMutation;
