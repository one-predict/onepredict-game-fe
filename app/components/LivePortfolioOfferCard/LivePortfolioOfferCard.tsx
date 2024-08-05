import { PortfolioOffer } from '@api/PortfolioOfferApi';
import { Portfolio } from '@api/PortfolioApi';
import PortfolioOfferCard from '@components/PortfolioOfferCard';
import Typography from '@components/Typography';
import styles from './LivePortfolioOfferCard.module.scss';

export interface LivePortfolioOfferCardProps {
  offer: PortfolioOffer;
  portfolio: Portfolio | null;
}

const LivePortfolioOfferCard = ({ offer, portfolio }: LivePortfolioOfferCardProps) => {
  if (!portfolio) {
    return <Typography variant="subtitle1">You did not submit your portfolio</Typography>;
  }

  return (
    <div className={styles.livePortfolioOfferCard}>
      <Typography className={styles.description} variant="subtitle2">
        The results of your choice
        <br />
        will be ready next day in few hours
      </Typography>
      <PortfolioOfferCard offer={offer} selectedTokensMap={portfolio.selectedTokens} />
    </div>
  );
};

export default LivePortfolioOfferCard;
