import { useCallback, useMemo, useState } from 'react';
import { PortfolioOffer } from '@api/PortfolioOfferApi';
import { SubmitButton } from '@components/Button';
import PortfolioOfferCard from '@components/PortfolioOfferCard';
import Typography from '@components/Typography';
import styles from './SubmitPortfolio.module.scss';

export interface SubmitPortfolioProps {
  offer: PortfolioOffer;
  onSubmit: (offerId: string, selectedTokens: string[]) => void;
  isSubmitInProgress?: boolean;
}

const SubmitPortfolio = ({ offer, onSubmit, isSubmitInProgress }: SubmitPortfolioProps) => {
  const [selectedTokensMap, setSelectedTokensMap] = useState<Record<number, string>>({});

  const handleTokenSelect = useCallback(
    (tokenId: string, lineIndex: number) => {
      setSelectedTokensMap((previousSelectedTokensMap) => ({
        ...previousSelectedTokensMap,
        [lineIndex]: tokenId,
      }));
    },
    [setSelectedTokensMap],
  );

  const allTokensSelected = useMemo(() => {
    return Object.keys(selectedTokensMap).length === offer.tokenOffers.length;
  }, [offer.tokenOffers.length, selectedTokensMap]);

  return (
    <div className={styles.submitPortfolioContainer}>
      <Typography color="gradient1" variant="h1">
        Make your choice
      </Typography>
      <PortfolioOfferCard
        className={styles.portfolioOfferCard}
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
    </div>
  );
};

export default SubmitPortfolio;
