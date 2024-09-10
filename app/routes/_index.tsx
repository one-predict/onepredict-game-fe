import { useCallback, useState } from 'react';
import { useNavigate } from '@remix-run/react';
import { PortfolioSelectedToken } from '@api/PortfolioApi';
import useBackButton from '@hooks/useBackButton';
import useTokensOffersSeriesQuery from '@hooks/queries/useTokensOffersSeriesQuery';
import useMyPortfoliosQuery from '@hooks/queries/useMyPortfoliosQuery';
import useOfferIdsFromSeries from '@hooks/useOfferIdsFromSeries';
import useCreatePortfolioMutation from '@hooks/mutations/useCreatePortfolioMutation';
import AppSection from '@enums/AppSection';
import PageBody from '@components/PageBody';
import Typography from '@components/Typography';
import FixedSlideView from '@components/FixedSlideView';
import PortfoliosGame from '@components/PortfoliosGame';
import LinearProgress from '@components/LinearProgress';
import TimeRemaining from '@components/TimeRemaining';
import HomeMenuSection from '@components/HomeMenuSection';
import styles from './home.module.scss';

export const handle = {
  appSection: AppSection.Home,
};

const HomePage = () => {
  const navigate = useNavigate();

  const [showMainGame, setShowMainGame] = useState(false);

  useBackButton(showMainGame, () => {
    setShowMainGame(false);
  }, [showMainGame]);

  const { data: offersSeries } = useTokensOffersSeriesQuery(null);

  const offerIds = useOfferIdsFromSeries(offersSeries);

  const { data: portfolios } = useMyPortfoliosQuery(offerIds);

  const { mutateAsync: createPortfolio, status: createPortfolioStatus } = useCreatePortfolioMutation();

  const handlePortfolioSubmit = useCallback(
    async (offerId: string, selectedTokens: PortfolioSelectedToken[]) => {
      await createPortfolio({ offerId, selectedTokens });
    },
    [createPortfolio],
  );

  const upcomingOffer = offersSeries?.next;

  return (
    <PageBody>
      <div className={styles.sections}>
        <HomeMenuSection
          title="Classic Challenge"
          description="Daily games with your crypto portfolio"
          actionButtonTitle="Earn"
          image="/images/home-menu/classic-challenge-section.png"
          menuSectionFooter={
            upcomingOffer && (
              <TimeRemaining unixTimestamp={upcomingOffer.timestamp}>
                {({ remainingHours, remainingMinutes, absoluteRemainingSeconds }) => {
                  const progress = (1 - absoluteRemainingSeconds / upcomingOffer!.durationInSeconds) * 100;
                  const isPortfolioSubmitted = !!portfolios?.[upcomingOffer!.id];

                  return (
                    <>
                      {portfolios && (
                        <div className={styles.classicChallengeOfferInfo}>
                          <Typography variant="subtitle2">
                            {isPortfolioSubmitted ? 'Next Offer:' : 'Offer Ends In:'}
                          </Typography>
                          {absoluteRemainingSeconds > 0 ? (
                            <Typography variant="h6">
                              {remainingHours}h {remainingMinutes}m
                            </Typography>
                          ) : (
                            <Typography variant="h6">Available Now</Typography>
                          )}
                          {!isPortfolioSubmitted && (
                            <Typography
                              className={styles.portfolioAvailableNotification}
                              variant="subtitle2"
                              color="yellow"
                            >
                              Portfolio Available
                            </Typography>
                          )}
                        </div>
                      )}
                      <LinearProgress progress={progress} />
                    </>
                  );
                }}
              </TimeRemaining>
            )
          }
          onActionButtonClick={() => setShowMainGame(true)}
        />
        <HomeMenuSection
          title="Tournaments"
          description="Compete with others for Prize pools"
          actionButtonTitle="Join"
          image="/images/home-menu/tournaments-section.png"
          imageClassName={styles.tournamentSectionImage}
          menuSectionFooter={<Typography variant="subtitle2">Few Tournaments are available!</Typography>}
          onActionButtonClick={() => navigate('/tournaments')}
        />
      </div>
      <FixedSlideView visible={showMainGame}>
        {showMainGame && (
          <PortfoliosGame
            className={styles.portfoliosGame}
            offersSeries={offersSeries ?? null}
            portfolios={portfolios ?? null}
            onPortfolioSubmit={handlePortfolioSubmit}
            isPortfolioSubmitInProgress={createPortfolioStatus === 'pending'}
          />
        )}
      </FixedSlideView>
    </PageBody>
  );
};

export default HomePage;
