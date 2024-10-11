import { Portfolio } from '@api/PortfolioApi';
import { TokensOffer } from '@api/TokensOfferApi';
import Typography from '@components/Typography';
import FinishedOfferCard from './FinishedOfferCard';
import styles from './FinishedOffersList.module.scss';

export interface FinishedOffersListProps {
  offers: TokensOffer[];
  portfolios: Record<string, Portfolio>;
}

const FinishedOffersList = ({ offers, portfolios }: FinishedOffersListProps) => {
  if (!offers.length) {
    return (
      <Typography className={styles.noOffersText} variant="subtitle1">
        No offers available
      </Typography>
    );
  }

  return (
    <div className={styles.finishedTokensOffersList}>
      {offers.map((offer) => {
        const portfolio = portfolios[offer.id];

        return <FinishedOfferCard key={offer.id} offer={offer} portfolio={portfolio} />;
      })}
    </div>
  );
};

export default FinishedOffersList;
