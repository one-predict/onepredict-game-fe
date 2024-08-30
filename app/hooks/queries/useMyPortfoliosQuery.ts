import _ from 'lodash';
import { useQuery } from '@tanstack/react-query';
import { usePortfolioApi } from '@providers/ApiProvider';
import { Portfolio } from '@api/PortfolioApi';

const useMyPortfoliosQuery = (offerIds?: string[]) => {
  const portfolioApi = usePortfolioApi();

  return useQuery({
    queryKey: ['portfolios', offerIds],
    queryFn: async () => {
      if (!offerIds?.length) {
        return {} as Record<string, Portfolio>;
      }

      const myPortfolios = await portfolioApi.getMyPortfolios(offerIds);

      return _.keyBy(myPortfolios, 'offerId');
    },
    enabled: !!offerIds,
  });
};

export default useMyPortfoliosQuery;
