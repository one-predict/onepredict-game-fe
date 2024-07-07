import styled from 'styled-components';
import { PortfolioOffer } from '@api/PortfolioOfferApi';
import TokenOfferLine from './TokenOfferLine';

export interface PortfolioOfferCardProps {
  className?: string;
  offer: PortfolioOffer;
  selectedTokensMap: Record<number, string> | string[];
  onTokenSelect?: (token: string, lineIndex: number) => void;
}

const StyledPortfolioOfferContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  row-gap: 16px;
`;

const PortfolioOfferCard = ({ offer, selectedTokensMap, onTokenSelect, className }: PortfolioOfferCardProps) => {
  return (
    <StyledPortfolioOfferContainer className={className}>
      {offer.tokenOffers.map((tokenOffer, index) => {
        return (
          <TokenOfferLine
            key={index}
            selectedToken={selectedTokensMap[index]}
            tokenOffer={tokenOffer}
            onTokenSelect={onTokenSelect}
            lineIndex={index}
          />
        );
      })}
    </StyledPortfolioOfferContainer>
  );
};

export default PortfolioOfferCard;
