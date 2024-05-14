import { useQuery } from '@tanstack/react-query';
import { usePortfolioOfferApi } from '@providers/ApiProvider';

const usePortfolioOffersQuery = () => {
  const portfolioOfferApi = usePortfolioOfferApi();

  return useQuery({
    queryKey: ['portfolio-offers'],
    queryFn: () => portfolioOfferApi.getPortfolioOffers(),
  });
};

export default usePortfolioOffersQuery;
