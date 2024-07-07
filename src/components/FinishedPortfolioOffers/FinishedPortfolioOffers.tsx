import styled from 'styled-components';
import { Portfolio } from '@api/PortfolioApi';
import { PortfolioOffer } from '@api/PortfolioOfferApi';
import FinishedPortfolioOfferCard from './FinishedPortfolioOfferCard';
import Typography from "@components/Typography";

export interface FinishedPortfolioOffersProps {
  offers: PortfolioOffer[];
  portfoliosMap: Record<string, Portfolio>;
}

const StyledFinishedPortfolioOffersContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  width: 100%;
  height: 100%;
`;

const FinishedPortfolioOffers = ({ offers, portfoliosMap }: FinishedPortfolioOffersProps) => {
  if (!offers.length) {
    return (
      <Typography variant="subtitle1">No offers available</Typography>
    );
  }

  return (
    <StyledFinishedPortfolioOffersContainer>
      {offers.map((offer) => {
        const portfolio = portfoliosMap[offer.id];

        return (
          <FinishedPortfolioOfferCard
            key={offer.id}
            offer={offer}
            portfolio={portfolio}
          />
        );
      })}
    </StyledFinishedPortfolioOffersContainer>
  );
};

export default FinishedPortfolioOffers;

