import { TokensOffer } from '@api/TokensOfferApi';
import { Portfolio, PortfolioSelectedToken } from '@api/PortfolioApi';
import Typography from '@components/Typography';
import TimeRemaining from '@components/TimeRemaining';
import PortfolioCard from '@components/PortfoliosGame/PortfolioCard';
import SubmitPortfolio from '@components/PortfoliosGame/SubmitPortfolio';
import styles from './UpcomingOffer.module.scss';

export interface UpcomingOfferProps {
  upcomingOffer: TokensOffer;
  upcomingPortfolio: Portfolio | null;
  onPortfolioSubmit: (offerId: string, selectedTokens: PortfolioSelectedToken[]) => void;
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
      <Typography variant="h1" color="gradient1">
        Your choice:
      </Typography>
      <TimeRemaining unixTimestamp={upcomingOffer.timestamp}>
        {({ remainingDays, remainingHours, remainingMinutes }) => {
          return (
            <Typography alignment="center" variant="body2" color="yellow">
              Live in {remainingDays}d {remainingHours}h {remainingMinutes}m
            </Typography>
          );
        }}
      </TimeRemaining>
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
