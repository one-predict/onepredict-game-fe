import { useCallback } from 'react';
import { DefaultError, useMutation, useQueryClient } from '@tanstack/react-query';
import { usePortfolioCardsDeckApi } from '@providers/ApiProvider';
import { CreatePortfolioCardsDeckParams, PortfolioCardsDeck } from '@api/PortfolioCardsDeckApi';

const useCreateCardsDeckMutation = () => {
  const portfolioCardsDeckApi = usePortfolioCardsDeckApi();

  const queryClient = useQueryClient();

  const handleMutationSuccess = useCallback(
    async (createdDeck: PortfolioCardsDeck) => {
      queryClient.setQueryData(['portfolio-cards-decks', 'my'], createdDeck);
    },
    [queryClient],
  );

  return useMutation<PortfolioCardsDeck, DefaultError, CreatePortfolioCardsDeckParams>({
    mutationFn: (params) => portfolioCardsDeckApi.createPortfolioCardsDeck(params),
    onSuccess: handleMutationSuccess,
  });
};

export default useCreateCardsDeckMutation;
