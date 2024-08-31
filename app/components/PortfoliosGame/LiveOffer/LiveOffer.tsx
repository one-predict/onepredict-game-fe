import { TokensOffer } from '@api/TokensOfferApi';
import { Portfolio } from '@api/PortfolioApi';
import Typography from '@components/Typography';
import TimeRemaining from '@components/TimeRemaining';
import PortfolioCard from '@components/PortfoliosGame/PortfolioCard';
import styles from './LiveOffer.module.scss';
export interface LiveOfferProps {
  liveOffer: TokensOffer;
  livePortfolio: Portfolio | null;
}

const LiveOffer = ({ livePortfolio, liveOffer }: LiveOfferProps) => {
  return livePortfolio ? (
    <div className={styles.livePortfolio}>
      <Typography variant="h1" color="gradient1">
        Your choice:
      </Typography>
      <TimeRemaining unixTimestamp={liveOffer.timestamp + liveOffer.durationInSeconds}>
        {({ remainingDays, remainingHours, remainingMinutes }) => {
          return (
            <Typography alignment="center" variant="body2">
              Ends in {remainingDays}d {remainingHours}h {remainingMinutes}m
            </Typography>
          );
        }}
      </TimeRemaining>
      <Typography
        className={styles.livePortfolioChoiceDescription}
        alignment="center"
        color="secondary"
        variant="subtitle2"
      >
        The results of your choice will be ready in few hours after your portfolio will be finished.
      </Typography>
      <PortfolioCard className={styles.livePortfolioCard} portfolio={livePortfolio} />
    </div>
  ) : (
    <Typography className={styles.noLivePortfolioTypography} variant="subtitle1">
      You did not submit your portfolio
    </Typography>
  );
};

export default LiveOffer;
