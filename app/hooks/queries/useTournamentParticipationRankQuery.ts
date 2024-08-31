import { useQuery } from '@tanstack/react-query';
import { useTournamentApi } from '@providers/ApiProvider';

const useTournamentParticipationRankQuery = (tournamentId: string) => {
  const tournamentApi = useTournamentApi();

  return useQuery({
    queryKey: ['tournament-participation-ranks', { tournamentId }],
    queryFn: async () => {
      return tournamentApi.getTournamentParticipationRank(tournamentId);
    },
    enabled: !!tournamentId,
  });
};

export default useTournamentParticipationRankQuery;
