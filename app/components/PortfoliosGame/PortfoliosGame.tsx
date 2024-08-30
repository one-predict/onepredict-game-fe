import { useState } from 'react';
import clsx from 'clsx';
import { TokensOffer } from '@api/TokensOfferApi';
import { Portfolio, PortfolioSelectedToken } from '@api/PortfolioApi';
import ButtonsToggle from '@components/ButtonsToggle';
import Loader from '@components/Loader';
import Typography from '@components/Typography';
import TimeRemaining from '@components/TimeRemaining';
import PortfolioCard from './PortfolioCard';
import SubmitPortfolio from './SubmitPortfolio';
import FinishedTokensOffersList from './FinishedTokensOffersList';
import styles from './PortfoliosGame.module.scss';

export type OffersCategory = 'upcoming' | 'live' | 'finished';

export interface PortfoliosGameProps {
  className?: string;
  offers: TokensOffer[] | null;
  portfolios: Record<string, Portfolio> | null;
  onPortfolioSubmit: (offerId: string, selectedTokens: PortfolioSelectedToken[]) => void;
  isPortfolioSubmitInProgress?: boolean;
}

const PortfoliosGame = ({
  className,
  offers,
  portfolios,
  onPortfolioSubmit,
  isPortfolioSubmitInProgress,
}: PortfoliosGameProps) => {
  const [selectedCategory, setSelectedCategory] = useState<OffersCategory>('upcoming');

  const renderOffersCategory = () => {
    if (!offers || !portfolios) {
      return (
        <div className={styles.loaderContainer}>
          <Loader />
        </div>
      );
    }

    const [upcomingOffer, liveOffer, ...finishedOffers] = offers;

    if (selectedCategory === 'upcoming') {
      const upcomingPortfolio = portfolios[upcomingOffer.id];

      return upcomingPortfolio ? (
        <div className={styles.upcomingPortfolio}>
          <Typography variant="h1" color="gradient1">
            Your choice:
          </Typography>
          <TimeRemaining unixTimestamp={upcomingOffer.timestamp}>
            {(remainingDays, remainingHours, remainingMinutes) => {
              return (
                <Typography alignment="center" variant="body2">
                  Live in {remainingDays}d {remainingHours}h {remainingMinutes}m
                </Typography>
              );
            }}
          </TimeRemaining>
          <PortfolioCard className={styles.upcomingPortfolioCard} portfolio={upcomingPortfolio} />
        </div>
      ) : (
        <SubmitPortfolio
          onSubmit={onPortfolioSubmit}
          isSubmitInProgress={isPortfolioSubmitInProgress}
          offer={upcomingOffer}
        />
      );
    }

    if (selectedCategory === 'live') {
      const livePortfolio = portfolios[liveOffer.id];

      return livePortfolio ? (
        <div className={styles.livePortfolio}>
          <Typography variant="h1" color="gradient1">
            Your choice:
          </Typography>
          <TimeRemaining unixTimestamp={liveOffer.timestamp + liveOffer.durationInSeconds}>
            {(remainingDays, remainingHours, remainingMinutes) => {
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
    }

    return <FinishedTokensOffersList portfolios={portfolios} offers={finishedOffers} />;
  };

  return (
    <div className={clsx(styles.portfoliosGame, className)}>
      <ButtonsToggle
        className={styles.buttonToggle}
        onSwitch={(category) => setSelectedCategory(category as OffersCategory)}
        toggles={[
          {
            title: 'Upcoming',
            id: 'upcoming',
          },
          {
            title: 'Live',
            id: 'live',
          },
          {
            title: 'Finished',
            id: 'finished',
          },
        ]}
        selectedId={selectedCategory}
      />
      <div className={styles.offersContainer}>{renderOffersCategory()}</div>
    </div>
  );
};

export default PortfoliosGame;
