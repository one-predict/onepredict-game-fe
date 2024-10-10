import { useMemo } from 'react';
import { Portfolio } from '@api/PortfolioApi';
import DigitalAssetId from '@enums/DigitalAssetId';
import DigitalAssetsPricePredictionCard from '@components/DigitalAssetsPricePredictionCard';
import Typography from '@components/Typography';
import CardsStackPreview from '@components/CardsStackPreview';
import EditIcon from '@assets/icons/edit.svg?react';
import styles from './PortfolioCard.module.scss';

export interface PortfolioCardProps {
  className?: string;
  portfolio: Portfolio;
  onEditPortfolioCards?: (portfolio: Portfolio) => void;
}

const PortfolioCard = ({ portfolio, className, onEditPortfolioCards }: PortfolioCardProps) => {
  const availableTokens = useMemo(() => {
    return portfolio.selectedTokens.map((token) => token.id);
  }, [portfolio.selectedTokens]);

  return (
    <>
      <DigitalAssetsPricePredictionCard
        className={className}
        availableTokens={availableTokens as DigitalAssetId[]}
        selectedTokens={portfolio.selectedTokens}
      />
      {onEditPortfolioCards && (
        <div className={styles.appliedCardsSection}>
          <div className={styles.appliedCardsSectionHeader}>
            <EditIcon onClick={() => onEditPortfolioCards?.(portfolio)} className={styles.editIcon} />
            <Typography alignment="center" variant="h2">
              Applied Cards
            </Typography>
          </div>
          <CardsStackPreview noCardsText="No Cards Applied to Portfolio" stack={portfolio.appliedCardsStack} />
        </div>
      )}
    </>
  );
};

export default PortfolioCard;
