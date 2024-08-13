import { useQuery } from '@tanstack/react-query';
import { useGameCardApi } from '@providers/ApiProvider';

const useGameCardsQuery = () => {
  const gameCardApi = useGameCardApi();

  return useQuery({
    queryKey: ['game-cards'],
    queryFn: () => gameCardApi.getCards(),
  });
};

export default useGameCardsQuery;
