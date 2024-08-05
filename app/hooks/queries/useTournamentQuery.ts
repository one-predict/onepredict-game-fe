import { useQuery } from '@tanstack/react-query';
import { useTournamentApi } from '@providers/ApiProvider';

const useTournamentQuery = (displayId: string) => {
  const tournamentApi = useTournamentApi();

  return useQuery({
    queryKey: ['tournaments', displayId],
    queryFn: async () => {
      return tournamentApi.getTournamentByDisplayId(displayId);
    },
  });
};

export default useTournamentQuery;
