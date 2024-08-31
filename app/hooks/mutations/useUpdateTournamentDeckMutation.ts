import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { DefaultError, useMutation, useQueryClient } from '@tanstack/react-query';
import { useTournamentDeckApi } from '@providers/ApiProvider';
import { TournamentDeck, UpdateTournamentDeckParams } from '@api/TournamentDeck';

const useUpdateTournamentDeckMutation = () => {
  const tournamentDeckApi = useTournamentDeckApi();

  const queryClient = useQueryClient();

  const handleMutationSuccess = useCallback(
    async (updatedDeck: TournamentDeck) => {
      queryClient.setQueryData(['tournament-decks', { tournamentId: updatedDeck.tournamentId, my: true }], updatedDeck);

      toast(`Your deck has been successfully updated.`);
    },
    [queryClient],
  );

  return useMutation<TournamentDeck, DefaultError, UpdateTournamentDeckParams & { id: string }>({
    mutationFn: ({ id, ...updateParams }) => tournamentDeckApi.updateTournamentDeck(id, updateParams),
    onSuccess: handleMutationSuccess,
  });
};

export default useUpdateTournamentDeckMutation;
