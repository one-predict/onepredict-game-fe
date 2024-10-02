import { useQuery } from '@tanstack/react-query';
import { useTournamentDeckApi } from '@providers/ApiProvider';

const useMyTournamentDeckQuery = (tournamentId: string) => {
  const tournamentDeckApi = useTournamentDeckApi();

  return useQuery({
    queryKey: ['tournament-decks', { tournamentId, my: true }],
    queryFn: () => tournamentDeckApi.getMyTournamentDeck(tournamentId),
  });
};

export default useMyTournamentDeckQuery;
