import { TokensOffersSeries } from '@api/TokensOfferApi';
import { useMemo } from 'react';

const useOfferIdsFromSeries = (offersSeries: TokensOffersSeries | null | undefined) => {
  return useMemo(() => {
    if (!offersSeries) {
      return undefined;
    }

    const ids = [];

    if (offersSeries.next) {
      ids.push(offersSeries.next.id);
    }

    if (offersSeries.current) {
      ids.push(offersSeries.current.id);
    }

    ids.push(...offersSeries.previous.map((offer) => offer.id));

    return ids;
  }, [offersSeries]);
};

export default useOfferIdsFromSeries;
