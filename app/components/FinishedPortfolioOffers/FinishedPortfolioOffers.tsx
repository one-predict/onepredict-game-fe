import { Portfolio } from '@api/PortfolioApi';
import { PortfolioOffer } from '@api/PortfolioOfferApi';
import FinishedPortfolioOfferCard from './FinishedPortfolioOfferCard';
import Typography from '@components/Typography';
import styles from './FinishedPortfolioOffers.module.scss';

export interface FinishedPortfolioOffersProps {
  offers: PortfolioOffer[];
  portfoliosMap: Record<string, Portfolio>;
}

const FinishedPortfolioOffers = ({ offers, portfoliosMap }: FinishedPortfolioOffersProps) => {
  if (!offers.length) {
    return <Typography variant="subtitle1">No offers available</Typography>;
  }

  return (
    <div className={styles.finishedPortfolioOffers}>
      {offers.map((offer) => {
        const portfolio = portfoliosMap[offer.id];

        return <FinishedPortfolioOfferCard key={offer.id} offer={offer} portfolio={portfolio} />;
      })}
    </div>
  );
};

export default FinishedPortfolioOffers;
