import { useQuery } from '@tanstack/react-query';
import { usePortfolioCardsDeckApi } from '@providers/ApiProvider';

const useMyCardsDeckQuery = () => {
  const portfolioCardsDeckApi = usePortfolioCardsDeckApi();

  return useQuery({
    queryKey: ['portfolio-cards-decks', 'my'],
    queryFn: () => portfolioCardsDeckApi.getMyPortfolioCardsDeck(),
  });
};

export default useMyCardsDeckQuery;
