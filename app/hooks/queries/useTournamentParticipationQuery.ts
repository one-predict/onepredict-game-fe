import { useQuery } from '@tanstack/react-query';
import { useTournamentApi } from '@providers/ApiProvider';

const useTournamentParticipationQuery = (tournamentId: string) => {
  const tournamentApi = useTournamentApi();

  return useQuery({
    queryKey: ['tournament-participations', { tournamentId }],
    queryFn: async () => {
      return tournamentApi.getTournamentParticipation(tournamentId);
    },
    enabled: !!tournamentId,
  });
};

export default useTournamentParticipationQuery;
