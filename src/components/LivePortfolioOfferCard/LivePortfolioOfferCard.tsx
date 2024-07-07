import styled from 'styled-components';
import { PortfolioOffer } from '@api/PortfolioOfferApi.ts';
import { Portfolio} from '@api/PortfolioApi.ts';
import PortfolioOfferCard from '@components/PortfolioOfferCard';
import Typography from '@components/Typography';

export interface LivePortfolioOfferCardProps {
  offer: PortfolioOffer;
  portfolio: Portfolio | null;
}

const StyledLivePortfolioOfferCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 16px;
  width: 100%;
  height: 100%;
`;

const StyledResultChoiceTypography = styled(Typography)`
  text-align: center;
  color: #439CB5;
`;

const LivePortfolioOfferCard = ({ offer, portfolio }: LivePortfolioOfferCardProps) => {
  if (!portfolio) {
    return (
      <Typography variant="subtitle1">
        You did not submit your portfolio
      </Typography>
    );
  }

  return (
    <StyledLivePortfolioOfferCardContainer>
      <StyledResultChoiceTypography variant="subtitle2">
        The results of your choice
        <br />
        will be ready next day in few hours
      </StyledResultChoiceTypography>
      <PortfolioOfferCard offer={offer} selectedTokensMap={portfolio.selectedTokens} />
    </StyledLivePortfolioOfferCardContainer>
  );
};

export default LivePortfolioOfferCard;
