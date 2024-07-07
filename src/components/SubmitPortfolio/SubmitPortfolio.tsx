import {useCallback, useMemo, useState} from 'react';
import styled from 'styled-components';
import { PortfolioOffer } from '@api/PortfolioOfferApi';
import { SubmitButton } from '@components/Button';
import PortfolioOfferCard from '@components/PortfolioOfferCard';
import { GradientTypography } from '@components/Typography';

export interface SubmitPortfolioProps {
  offer: PortfolioOffer;
  onSubmit: (offerId: string, selectedTokens: string[]) => void;
  isSubmitInProgress?: boolean;
}

const StyledSubmitPortfolioContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const StyledPortfolioOfferCard = styled(PortfolioOfferCard)`
  margin: 16px 0 24px;
`;

const SubmitPortfolio = ({ offer, onSubmit, isSubmitInProgress }: SubmitPortfolioProps) => {
  const [selectedTokensMap, setSelectedTokensMap] = useState<Record<number, string>>({});

  const handleTokenSelect = useCallback((tokenId: string, lineIndex: number) => {
    setSelectedTokensMap((previousSelectedTokensMap) => ({
      ...previousSelectedTokensMap,
      [lineIndex]: tokenId,
    }));
  }, [setSelectedTokensMap]);

  const allTokensSelected = useMemo(() => {
    return Object.keys(selectedTokensMap).length === offer.tokenOffers.length;
  }, [offer.tokenOffers.length, selectedTokensMap]);

  return (
    <StyledSubmitPortfolioContainer>
      <GradientTypography variant="h1">Make your choice</GradientTypography>
      <StyledPortfolioOfferCard
        offer={offer}
        selectedTokensMap={selectedTokensMap}
        onTokenSelect={handleTokenSelect}
      />
      <SubmitButton
        disabled={!allTokensSelected}
        onClick={() => onSubmit(offer.id, Object.values(selectedTokensMap))}
        loading={isSubmitInProgress}
      >
        Submit
      </SubmitButton>
    </StyledSubmitPortfolioContainer>
  );
};

export default SubmitPortfolio;
