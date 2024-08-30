import { useQuery } from '@tanstack/react-query';
import { useTournamentApi } from '@providers/ApiProvider';
import { TournamentStatus } from '@api/TournamentApi';

const useLatestTournamentsQuery = (tournamentStatus?: TournamentStatus) => {
  const tournamentApi = useTournamentApi();

  return useQuery({
    queryKey: ['tournaments', tournamentStatus],
    queryFn: () => tournamentApi.getLatestTournaments(tournamentStatus),
  });
};

export default useLatestTournamentsQuery;
