import { useQuery, skipToken } from '@tanstack/react-query';
import { useTokensOfferApi } from '@providers/ApiProvider';

const useTokensOffersSeriesQuery = (tournamentId: string | null | undefined) => {
  const tokensOfferApi = useTokensOfferApi();

  return useQuery({
    queryKey: ['tokens-offers', { tournamentId, series: true }],
    queryFn:
      tournamentId !== undefined && tournamentId !== ''
        ? () => {
            return tokensOfferApi.getOffersSeries(tournamentId as string | null);
          }
        : skipToken,
  });
};

export default useTokensOffersSeriesQuery;
