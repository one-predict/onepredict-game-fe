import { useState } from 'react';
import clsx from 'clsx';
import { TokensOffersSeries } from '@api/TokensOfferApi';
import { Portfolio, PortfolioSelectedToken } from '@api/PortfolioApi';
import ButtonsToggle from '@components/ButtonsToggle';
import Loader from '@components/Loader';
import Typography from '@components/Typography';
import UpcomingOffer from './UpcomingOffer';
import LiveOffer from './LiveOffer';
import FinishedTokensOffersList from './FinishedTokensOffersList';
import styles from './PortfoliosGame.module.scss';

export type OffersCategory = 'upcoming' | 'live' | 'finished';

export interface PortfoliosGameProps {
  className?: string;
  offersSeries: TokensOffersSeries | null;
  portfolios: Record<string, Portfolio> | null;
  onPortfolioSubmit: (offerId: string, selectedTokens: PortfolioSelectedToken[]) => void;
  onEditPortfolioCards?: (portfolio: Portfolio) => void;
  isPortfolioSubmitInProgress?: boolean;
}

const PortfoliosGame = ({
  className,
  offersSeries,
  portfolios,
  onPortfolioSubmit,
  onEditPortfolioCards,
  isPortfolioSubmitInProgress,
}: PortfoliosGameProps) => {
  const [selectedCategory, setSelectedCategory] = useState<OffersCategory>('upcoming');

  const renderOffersCategory = () => {
    if (!offersSeries || !portfolios) {
      return <Loader centered />;
    }

    const { next: upcomingOffer, current: liveOffer, previous: finishedOffers } = offersSeries;

    if (selectedCategory === 'upcoming') {
      return upcomingOffer ? (
        <UpcomingOffer
          upcomingOffer={upcomingOffer}
          upcomingPortfolio={portfolios[upcomingOffer.id]}
          onPortfolioSubmit={onPortfolioSubmit}
          onEditPortfolioCards={onEditPortfolioCards}
          isPortfolioSubmitInProgress={isPortfolioSubmitInProgress}
        />
      ) : (
        <Typography variant="subtitle1" className={styles.noOfferAvailableText}>
          No Upcoming Offers available.
        </Typography>
      );
    }

    if (selectedCategory === 'live') {
      return liveOffer ? (
        <LiveOffer liveOffer={liveOffer} livePortfolio={portfolios[liveOffer.id]} />
      ) : (
        <Typography className={styles.noOfferAvailableText} variant="subtitle1">
          No Live Offers available.
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
