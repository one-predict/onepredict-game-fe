import clsx from 'clsx';
import { PortfolioOffer } from '@api/PortfolioOfferApi';
import TokenOfferLine from './TokenOfferLine';
import styles from './PortfolioOfferCard.module.scss';

export interface PortfolioOfferCardProps {
  className?: string;
  offer: PortfolioOffer;
  selectedTokensMap: Record<number, string> | string[];
  onTokenSelect?: (token: string, lineIndex: number) => void;
}

const PortfolioOfferCard = ({ offer, selectedTokensMap, onTokenSelect, className }: PortfolioOfferCardProps) => {
  return (
    <div className={clsx(styles.portfolioOfferCard, className)}>
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
    </div>
  );
};

export default PortfolioOfferCard;
