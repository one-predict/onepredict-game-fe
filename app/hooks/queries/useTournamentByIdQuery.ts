import { useQuery } from '@tanstack/react-query';
import { useTournamentApi } from '@providers/ApiProvider';

const useTournamentByIdQuery = (tournamentId: string) => {
  const tournamentApi = useTournamentApi();

  return useQuery({
    queryKey: ['tournaments', tournamentId],
    queryFn: async () => {
      return tournamentApi.getTournamentById(tournamentId);
    },
  });
};

export default useTournamentByIdQuery;
