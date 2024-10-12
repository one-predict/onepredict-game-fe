import { TokensOffer } from '@api/TokensOfferApi';
import { Portfolio } from '@api/PortfolioApi';
import DigitalAssetPricePrediction from '@types/DigitalAssetPricePrediction';
import Typography from '@components/Typography';
import TimeRemaining from '@components/TimeRemaining';
import PortfolioCard from '@components/PortfoliosGame/PortfolioCard';
import SubmitPortfolio from '@components/PortfoliosGame/SubmitPortfolio';
import styles from './UpcomingOffer.module.scss';

export interface UpcomingOfferProps {
  upcomingOffer: TokensOffer;
  upcomingPortfolio: Portfolio | null;
  onPortfolioSubmit: (offerId: string, predictions: DigitalAssetPricePrediction[]) => void;
  onEditPortfolioCards?: (portfolio: Portfolio) => void;
  isPortfolioSubmitInProgress?: boolean;
}

const UpcomingOffer = ({
  upcomingPortfolio,
  upcomingOffer,
  onPortfolioSubmit,
  onEditPortfolioCards,
  isPortfolioSubmitInProgress,
}: UpcomingOfferProps) => {
  return upcomingPortfolio ? (
    <div className={styles.upcomingPortfolio}>
      <div className={styles.upcomingPortfolioBackdrop}>
        <TimeRemaining unixTimestamp={upcomingOffer.timestamp}>
          {({ remainingDays, remainingHours, remainingMinutes }) => {
            return (
              <Typography alignment="center" variant="h3" color="yellow">
                Live in {remainingDays}d {remainingHours}h {remainingMinutes}m
              </Typography>
            );
          }}
        </TimeRemaining>
      </div>
      <PortfolioCard
        className={styles.upcomingPortfolioCard}
        onEditPortfolioCards={onEditPortfolioCards}
        portfolio={upcomingPortfolio}
      />
    </div>
  ) : (
    <SubmitPortfolio
      onSubmit={onPortfolioSubmit}
      isSubmitInProgress={isPortfolioSubmitInProgress}
      offer={upcomingOffer}
    />
  );
};

export default UpcomingOffer;
