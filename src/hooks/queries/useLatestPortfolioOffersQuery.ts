import { useQuery } from '@tanstack/react-query';
import { usePortfolioOfferApi } from '@providers/ApiProvider';

const useLatestPortfolioOffersQuery = () => {
  const portfolioOfferApi = usePortfolioOfferApi();

  return useQuery({
    queryKey: ['portfolio-offers'],
    queryFn: () => portfolioOfferApi.getLatestPortfolioOffers(),
  });
};

export default useLatestPortfolioOffersQuery;
