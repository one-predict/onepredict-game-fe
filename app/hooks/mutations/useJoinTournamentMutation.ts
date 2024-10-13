import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { DefaultError, useMutation, useQueryClient } from '@tanstack/react-query';
import { useTournamentApi } from '@providers/ApiProvider';

interface TournamentParticipationParams {
  tournamentId: string;
  walletAddress?: string;
}

const useJoinTournamentMutation = () => {
  const tournamentApi = useTournamentApi();

  const queryClient = useQueryClient();

  const handleMutationSuccess = useCallback(
    async (_result: void, params: TournamentParticipationParams) => {
      await Promise.all([
        await queryClient.invalidateQueries({
          queryKey: ['tournament-participations', { tournamentId: params.tournamentId }],
        }),
        await queryClient.invalidateQueries({
          queryKey: ['tournament-participation-ranks', { tournamentId: params.tournamentId }],
        }),
        await queryClient.invalidateQueries({
          queryKey: ['tournament-leaderboards', { tournamentId: params.tournamentId }],
        }),
        await queryClient.invalidateQueries({ queryKey: ['tournaments', { tournamentId: params.tournamentId }] }),
        await queryClient.invalidateQueries({ queryKey: ['current-user'] }),
        await queryClient.invalidateQueries({
          queryKey: ['tournament-decks', { tournamentId: params.tournamentId, my: true }],
        }),
      ]);

      toast.success(`You have successfully joined the tournament!`);
    },
    [queryClient],
  );

  return useMutation<void, DefaultError, TournamentParticipationParams>({
    mutationFn: (params) => tournamentApi.joinTournament(params.tournamentId, params.walletAddress),
    onSuccess: handleMutationSuccess,
  });
};

export default useJoinTournamentMutation;
