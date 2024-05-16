import styled from 'styled-components';
import dayjs from 'dayjs';
import { PortfolioOffer } from '@api/PortfolioOfferApi';
import { Portfolio } from '@api/PortfolioApi';
import { TypographyProps } from '@components/Typography'
import LayeredCard from '@components/LayeredCard';
import Typography from '@components/Typography';
import Button from '@components/Button';
import TokenOfferLine from './TokenOfferLine';

export interface PortfolioOfferCardProps {
  offer: PortfolioOffer;
  title: string;
  onSelectOffer: (offer: PortfolioOffer) => void;
  portfolio?: Portfolio | null;
  allowToCreatePortfolio?: boolean;
  isLiveOffer?: boolean;
  isBoostingAvailable?: boolean;
}

const StyledPortfolioOfferContainer = styled.div`
  position: relative;
  width: 330px;

  @media (${({ theme }) => theme.devices.tablet}) {
    width: 520px;
  }
`;

const StyledPortfolioOfferHeader = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 18px;

  @media (${({ theme }) => theme.devices.tablet}) {
    margin-bottom: 16px;
  }
`;

const StyledTitle = styled(Typography)<
  { $live?: boolean; } & TypographyProps
>`
  position: relative;
  width: fit-content;
  color: white;
  text-transform: uppercase;

  &:after {
    display: ${({ $live }) => ($live ? 'block' : 'none')};
    position: absolute;
    top: calc(50% - 2px);
    left: 100%;
    transform: translateY(-50%);
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #00ff00;
    margin-left: 6px;
  }

  @media (${({ theme }) => theme.devices.tablet}) {
    &:after {
      width: 10px;
      height: 10px;
    }
  }
`;

const StyledDateInfo = styled(Typography)`
  color: #801f75;
`;

const StyledCreatePortfolioButton = styled(Button)`
  width: 100%;
  margin-top: 10px;

  @media (${({ theme }) => theme.devices.tablet}) {
    margin-top: 20px;
  }
`;

const BoostPortfolioButton = styled(Button)`
  width: 100%;
  margin-top: 10px;
  
  @media (${({ theme }) => theme.devices.tablet}) {
    margin-top: 20px;
  }
`;

const StyledTokenOfferLinesContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;

const StyledYourPointsTitle = styled(Typography)`
  text-align: center;
`;

const StyledPoints = styled(Typography)<{
  $success: boolean & TypographyProps;
}>`
  color: ${({ theme, $success }) => $success ? theme.palette.seaGreen : theme.palette.red};
  text-align: center;
  margin-bottom: 20px;
`;

const PortfolioOfferCard = ({
  offer,
  title,
  onSelectOffer,
  allowToCreatePortfolio,
  isBoostingAvailable,
  isLiveOffer,
  portfolio,
}: PortfolioOfferCardProps) => {
  const earnedPoints = portfolio?.earnedPoints || 0;

  return (
    <StyledPortfolioOfferContainer>
      <StyledPortfolioOfferHeader>
        <StyledTitle $live={isLiveOffer} variant="h4">
          {title}
        </StyledTitle>
        <StyledDateInfo variant="body2">
          {dayjs(offer.date, 'MM/DD/YYYY').format('MMM Do')} 12AM - 11:59PM (UTC)
        </StyledDateInfo>
      </StyledPortfolioOfferHeader>
      <LayeredCard>
        {portfolio?.isAwarded && (
          <>
            <StyledYourPointsTitle>
              Your Points
            </StyledYourPointsTitle>
            <StyledPoints $success={earnedPoints > 0}>
              {earnedPoints > 0 ? `+${earnedPoints}` : earnedPoints}
            </StyledPoints>
          </>
        )}
        <StyledTokenOfferLinesContainer>
          {offer.tokenOffers.map((tokenOffer, index) => (
            <TokenOfferLine
              key={index}
              selectedTokens={portfolio?.selectedTokens}
              tokenOffer={tokenOffer}
            />
          ))}
        </StyledTokenOfferLinesContainer>
        {allowToCreatePortfolio && (
          <StyledCreatePortfolioButton
            size="small"
            onClick={() => onSelectOffer(offer)}
          >
            Create Portfolio
          </StyledCreatePortfolioButton>
        )}
        {isBoostingAvailable && portfolio && (
          <BoostPortfolioButton disabled size="small">
            Boost Portfolio
          </BoostPortfolioButton>
        )}
      </LayeredCard>
    </StyledPortfolioOfferContainer>
  );
};

export default PortfolioOfferCard;
