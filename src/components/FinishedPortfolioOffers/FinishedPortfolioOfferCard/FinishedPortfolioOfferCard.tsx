import { useState } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import Collapse from '@mui/material/Collapse';
import { PortfolioOffer } from '@api/PortfolioOfferApi';
import { Portfolio} from '@api/PortfolioApi';
import Typography, {GradientTypography} from '@components/Typography';
import PortfolioOfferCard from '@components/PortfolioOfferCard';
import TriangleIcon from '@assets/icons/triangle.svg?react';
import ExpandIcon from '@assets/icons/expand.svg?react';
import CrossIcon from '@assets/icons/cross.svg?react';

export interface FinishedPortfolioOfferCardProps {
  offer: PortfolioOffer;
  portfolio: Portfolio | null;
}

const StyledPointsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 4px;
`;

const StyledPointsTypography = styled(Typography)<{ $positive: boolean }>`
  color: ${({ $positive }) => $positive ? '#10C600' : '#D60000'};
`;

const StyledOfferDateTypography = styled(Typography)`
  color: #439CB5;
  margin-bottom: 8px;
`;

const StyledCollapseContainer = styled(Collapse)`
  width: 100%;
`;

const StyledToggleIconContainer = styled.div`
  position: absolute;
  right: 16px;
  cursor: pointer;
  
  & > svg {
    width: 16px;
    height: 16px;
    stroke: #439CB5;
  }
  
  @media (${({ theme }) => theme.devices.tablet}) {
    & > svg {
      width: 24px;
      height: 24px;
    }
  }
`;

const StyledTriangleIcon = styled(TriangleIcon)<{ $positive: boolean; }>`
  width: 16px;
  height: 16px;
  margin-bottom: ${({ $positive }) => $positive ? `1px` : `0px`};
  fill: ${({ $positive }) => $positive ? '#10C600' : '#D60000'};
  transform: ${({ $positive }) => $positive ? 'none' : 'rotate(180deg)'};
`;

const StyledFinishedPortfolioOfferCard = styled.div<{ $expanded: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: ${({ $expanded }) => $expanded ? 'center' : 'unset'};
  width: 100%;
  padding: 10px 16px;
  background-color: #190A31;
  border: 1px solid #8C8498;
  border-radius: 12px;
  
  ${StyledPointsContainer} {
    order: ${({ $expanded }) => $expanded ? 0 : 1};
    margin: ${({ $expanded }) => $expanded ? `4px 0` : `0px`};
  }
  
  ${StyledOfferDateTypography} {
    order: ${({ $expanded }) => $expanded ? 1 : 0};
  }
  
  ${StyledCollapseContainer} {
    order: 2;
  }
`;

const getNoResultsText = (portfolio: Portfolio | null) => {
  if (!portfolio) {
    return 'No Results';
  }

  return !portfolio.isAwarded ? 'Waiting for results...' : '';
};

const FinishedPortfolioOfferCard = ({ offer, portfolio }: FinishedPortfolioOfferCardProps) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const formattedDate = dayjs(offer.date).format('YYYY-MM-DD');

  return (
    <StyledFinishedPortfolioOfferCard $expanded={expanded}>
      {expanded && <GradientTypography variant="h1">Your points</GradientTypography>}
      <StyledOfferDateTypography variant="subtitle2">{formattedDate}</StyledOfferDateTypography>
      {portfolio && portfolio.isAwarded && portfolio.earnedCoins ? (
        <>
          <StyledPointsContainer>
            <StyledTriangleIcon $positive={portfolio.earnedCoins > 0} />
            <StyledPointsTypography
              $positive={portfolio.earnedCoins > 0}
              variant="subtitle1"
            >
              {portfolio.earnedCoins > 0 ? `+${portfolio.earnedCoins}` : portfolio.earnedCoins}
            </StyledPointsTypography>
          </StyledPointsContainer>
          <StyledCollapseContainer in={expanded}>
            <PortfolioOfferCard offer={offer} selectedTokensMap={portfolio?.selectedTokens || []} />
          </StyledCollapseContainer>
        </>
      ) : (
        <>
          <Typography variant="subtitle1">{getNoResultsText(portfolio)}</Typography>
        </>
      )}
      {portfolio && portfolio.isAwarded && (
        <StyledToggleIconContainer onClick={() => setExpanded(!expanded)}>
          {expanded ? <CrossIcon /> : <ExpandIcon />}
        </StyledToggleIconContainer>
      )}
    </StyledFinishedPortfolioOfferCard>
  );
};

export default FinishedPortfolioOfferCard;
