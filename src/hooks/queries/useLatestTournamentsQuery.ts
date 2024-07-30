import { useQuery } from '@tanstack/react-query';
import { useTournamentApi } from '@providers/ApiProvider';

const useLatestTournamentsQuery = () => {
  const tournamentApi = useTournamentApi();

  return useQuery({
    queryKey: ['tournaments'],
    queryFn: () => tournamentApi.getLatestTournaments(),
  });
};

export default useLatestTournamentsQuery;
