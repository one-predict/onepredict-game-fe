import { useQuery } from '@tanstack/react-query';
import { useTournamentApi } from '@providers/ApiProvider';

const useTournamentLeaderboardQuery = (tournamentId: string) => {
  const tournamentApi = useTournamentApi();

  return useQuery({
    queryKey: ['tournament-leaderboards', { tournamentId }],
    queryFn: async () => {
      return tournamentApi.getTournamentLeaderboard(tournamentId);
    },
    enabled: !!tournamentId,
  });
};

export default useTournamentLeaderboardQuery;
