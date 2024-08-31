import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { DefaultError, useMutation, useQueryClient } from '@tanstack/react-query';
import { useGameCardsMarketplaceApi } from '@providers/ApiProvider';
import { GameCardId } from '@api/GameCardApi';

const usePurchaseCardMutation = () => {
  const gameCardsMarketplaceApi = useGameCardsMarketplaceApi();

  const queryClient = useQueryClient();

  const handleMutationSuccess = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: ['inventories', { my: true }] });
    await queryClient.invalidateQueries({ queryKey: ['current-user'] });

    toast(`You have successfully purchased the card!`);
  }, [queryClient]);

  return useMutation<void, DefaultError, GameCardId>({
    mutationFn: (gameCardId) => gameCardsMarketplaceApi.purchaseGameCard(gameCardId),
    onSuccess: handleMutationSuccess,
  });
};

export default usePurchaseCardMutation;
