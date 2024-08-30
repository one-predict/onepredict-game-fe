import { useQuery } from '@tanstack/react-query';
import { useTokensOfferApi } from '@providers/ApiProvider';

const useLatestTokensOffersQuery = (tournamentId: string | null | undefined) => {
  const tokensOfferApi = useTokensOfferApi();

  return useQuery({
    queryKey: ['tokens-offers'],
    queryFn: () => tokensOfferApi.getLatestTokensOffers(tournamentId),
    enabled: tournamentId !== undefined && tournamentId !== '',
  });
};

export default useLatestTokensOffersQuery;
