import { useQuery } from '@tanstack/react-query';
import { useGameCardApi } from '@providers/ApiProvider';
import { GameCardId } from '@api/GameCardApi';

const useGameCardsByIdsQuery = (ids: GameCardId[]) => {
  const gameCardApi = useGameCardApi();

  return useQuery({
    queryKey: ['game-cards', ids],
    queryFn: () => gameCardApi.getCardsByIds(ids),
    enabled: ids.length > 0,
  });
};

export default useGameCardsByIdsQuery;
