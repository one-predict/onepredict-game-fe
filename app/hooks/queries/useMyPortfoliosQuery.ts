import _ from 'lodash';
import { useQuery, skipToken } from '@tanstack/react-query';
import { usePortfolioApi } from '@providers/ApiProvider';
import { Portfolio } from '@api/PortfolioApi';

const useMyPortfoliosQuery = (offerIds?: string[]) => {
  const portfolioApi = usePortfolioApi();

  return useQuery({
    queryKey: ['portfolios', { offerIds }],
    queryFn: offerIds
      ? async () => {
          if (!offerIds!.length) {
            return {} as Record<string, Portfolio>;
          }

          const myPortfolios = await portfolioApi.getMyPortfolios(offerIds as string[]);

          return _.keyBy(myPortfolios, 'offerId');
        }
      : skipToken,
  });
};

export default useMyPortfoliosQuery;
