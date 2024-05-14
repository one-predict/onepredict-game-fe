import { useMemo } from 'react';
import styled from 'styled-components';
import { PortfolioOffer } from '@api/PortfolioOfferApi';
import { Portfolio } from '@api/PortfolioApi';
import Loader from '@components/Loader';
import PortfolioOfferCard from './PortfolioOfferCard';

export interface PortfolioOffersProps {
  offers: PortfolioOffer[] | null;
  portfolios: Portfolio[] | null;
  onSelectOffer: (offer: PortfolioOffer) => void;
}

const StyledPortfolioOffersContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 30px;
`;

const StyledLoader = styled(Loader)`
  height: 150px;
`;

const UPCOMING_OFFER_INDEX = 0;
const LIVE_OFFER_INDEX = 1;

const PortfolioOffers = ({
  offers,
  portfolios,
  onSelectOffer,
}: PortfolioOffersProps) => {
  const portfoliosByOfferId = useMemo(() => {
    return portfolios?.reduce(
      (previousMap, portfolio) => {
        previousMap[portfolio.offerId] = portfolio;

        return previousMap;
      },
      {} as Record<string, Portfolio>,
    );
  }, [portfolios]);

  if (!offers || !portfoliosByOfferId) {
    return <StyledLoader />;
  }

  const getPortfolioOfferTitle = (index: number) => {
    if (index === UPCOMING_OFFER_INDEX) {
      return 'Upcoming';
    }

    if (index === LIVE_OFFER_INDEX) {
      return 'Live';
    }

    return 'Previous';
  };

  return (
    <StyledPortfolioOffersContainer>
      {offers.map((offer, index) => (
        <PortfolioOfferCard
          key={offer.id}
          offer={offer}
          portfolio={portfoliosByOfferId[offer.id]}
          title={getPortfolioOfferTitle(index)}
          onSelectOffer={onSelectOffer}
          allowToCreatePortfolio={index === UPCOMING_OFFER_INDEX && !portfoliosByOfferId[offer.id]}
          isBoostingAvailable={index === UPCOMING_OFFER_INDEX}
          isLiveOffer={index === LIVE_OFFER_INDEX}
        />
      ))}
    </StyledPortfolioOffersContainer>
  );
};

export default PortfolioOffers;
