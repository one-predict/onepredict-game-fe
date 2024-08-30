import { Portfolio } from '@api/PortfolioApi';
import { TokensOffer } from '@api/TokensOfferApi';
import Typography from '@components/Typography';
import FinishedTokensOfferCard from './FinishedTokensOfferCard';
import styles from './FinishedTokensOffersList.module.scss';

export interface FinishedTokensOffersListProps {
  offers: TokensOffer[];
  portfolios: Record<string, Portfolio>;
}

const FinishedTokensOffersList = ({ offers, portfolios }: FinishedTokensOffersListProps) => {
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

        return <FinishedTokensOfferCard key={offer.id} offer={offer} portfolio={portfolio} />;
      })}
    </div>
  );
};

export default FinishedTokensOffersList;
