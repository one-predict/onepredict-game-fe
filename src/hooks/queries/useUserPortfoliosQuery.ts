import { useQuery } from '@tanstack/react-query';
import { usePortfolioApi } from '@providers/ApiProvider';
import { Portfolio } from '@api/PortfolioApi';

const useUserPortfoliosQuery = (offerIds?: string[]) => {
  const portfolioApi = usePortfolioApi();

  return useQuery({
    queryKey: ['portfolios', offerIds],
    queryFn: async () => {
      if (!offerIds) {
        return [] as Portfolio[];
      }

      return portfolioApi.getUserPortfolios(offerIds);
    },
    enabled: !!offerIds,
  });
};

export default useUserPortfoliosQuery;
