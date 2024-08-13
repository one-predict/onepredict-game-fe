import { useCallback } from 'react';
import { DefaultError, useMutation, useQueryClient } from '@tanstack/react-query';
import { useGameCardsMarketplaceApi } from '@providers/ApiProvider';
import { GameCardId } from '@api/GameCardApi';

const usePurchaseCardMutation = () => {
  const gameCardsMarketplaceApi = useGameCardsMarketplaceApi();

  const queryClient = useQueryClient();

  const handleMutationSuccess = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: ['inventories', 'my'] });
    await queryClient.invalidateQueries({ queryKey: ['current-user'] });
  }, [queryClient]);

  return useMutation<void, DefaultError, GameCardId>({
    mutationFn: (gameCardId) => gameCardsMarketplaceApi.purchaseGameCard(gameCardId),
    onSuccess: handleMutationSuccess,
  });
};

export default usePurchaseCardMutation;
