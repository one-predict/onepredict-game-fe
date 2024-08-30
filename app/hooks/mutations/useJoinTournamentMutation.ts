import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { DefaultError, useMutation, useQueryClient } from '@tanstack/react-query';
import { useTournamentApi } from '@providers/ApiProvider';

const useJoinTournamentMutation = () => {
  const tournamentApi = useTournamentApi();

  const queryClient = useQueryClient();

  const handleMutationSuccess = useCallback(
    async (_result: void, tournamentId: string) => {
      await queryClient.invalidateQueries({ queryKey: ['tournament-participations', tournamentId] });
      await queryClient.invalidateQueries({ queryKey: ['tournament-participation-ranks', tournamentId] });
      await queryClient.invalidateQueries({ queryKey: ['tournament-leaderboards', tournamentId] });
      await queryClient.invalidateQueries({ queryKey: ['tournaments', tournamentId] });
      await queryClient.invalidateQueries({ queryKey: ['current-user'] });
      await queryClient.invalidateQueries({ queryKey: ['tournament-decks', tournamentId, 'my'] });

      toast(`You have successfully joined the tournament!`);
    },
    [queryClient],
  );

  return useMutation<void, DefaultError, string>({
    mutationFn: (tournamentId) => tournamentApi.joinTournament(tournamentId),
    onSuccess: handleMutationSuccess,
  });
};

export default useJoinTournamentMutation;
