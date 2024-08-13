import { useCallback, useMemo, useState } from 'react';
import _ from 'lodash';
import { toast } from 'react-toastify';
import AppSection from '@enums/AppSection';
import { PortfolioSelectedToken } from '@api/PortfolioApi';
import useLatestPortfolioOffersQuery from '@hooks/queries/useLatestPortfolioOffersQuery';
import useUserPortfoliosQuery from '@hooks/queries/useUserPortfoliosQuery';
import useCreatePortfolioMutation from '@hooks/mutations/useCreatePortfolioMutation';
import Typography from '@components/Typography';
import ButtonsToggle from '@components/ButtonsToggle';
import PortfolioCard from '@components/PortfolioCard';
import SubmitPortfolio from '@components/SubmitPortfolio';
import FinishedPortfolioOffers from '@components/FinishedPortfolioOffers';
import Loader from '@components/Loader';
import TimeRemaining from '@components/TimeRemaining';
import PageBody from '@components/PageBody';
import styles from './portfolios.module.scss';

type OffersCategory = 'upcoming' | 'live' | 'finished';

export const handle = {
  appSection: AppSection.Portfolios,
};

const PortfoliosPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<OffersCategory>('upcoming');

  const { data: offers } = useLatestPortfolioOffersQuery();

  const offerIds = useMemo(() => {
    return offers?.map((offer) => offer.id);
  }, [offers]);

  const { data: portfolios } = useUserPortfoliosQuery(offerIds);

  const portfoliosMap = useMemo(() => _.keyBy(portfolios, 'offerId'), [portfolios]);

  const { mutateAsync: createPortfolio, status: createPortfolioStatus } = useCreatePortfolioMutation();

  const handleSubmitPortfolio = useCallback(
    async (offerId: string, selectedTokens: PortfolioSelectedToken[]) => {
      await createPortfolio({
        offerId,
        selectedTokens,
      });

      toast('Portfolio submitted successfully!');
    },
    [createPortfolio],
  );

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
      const upcomingPortfolio = portfoliosMap[upcomingOffer.id];

      return upcomingPortfolio ? (
        <div className={styles.upcomingPortfolio}>
          <Typography variant="h1" color="gradient1">
            Your choice:
          </Typography>
          <TimeRemaining day={upcomingOffer.day}>
            {(remainingHours, remainingMinutes) => {
              return remainingHours > 0 || remainingMinutes > 0 ? (
                <Typography color="secondary" alignment="center" variant="body2">
                  This offer will become live in {remainingHours} hours and {remainingMinutes} minutes
                </Typography>
              ) : null;
            }}
          </TimeRemaining>
          <PortfolioCard className={styles.upcomingPortfolioCard} portfolio={upcomingPortfolio} />
        </div>
      ) : (
        <SubmitPortfolio
          onSubmit={handleSubmitPortfolio}
          isSubmitInProgress={createPortfolioStatus === 'pending'}
          offer={upcomingOffer}
        />
      );
    }

    if (selectedCategory === 'live') {
      const livePortfolio = portfoliosMap[liveOffer.id];

      return livePortfolio ? (
        <div className={styles.livePortfolio}>
          <Typography variant="h1" color="gradient1">
            Your choice:
          </Typography>
          <TimeRemaining day={liveOffer.day + 1}>
            {(remainingHours, remainingMinutes) => {
              return remainingHours > 0 || remainingMinutes > 0 ? (
                <Typography alignment="center" variant="body2">
                  Open for {remainingHours} hours and {remainingMinutes} minutes
                </Typography>
              ) : null;
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

    return <FinishedPortfolioOffers portfoliosMap={portfoliosMap} offers={finishedOffers} />;
  };

  return (
    <PageBody>
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
    </PageBody>
  );
};

export default PortfoliosPage;
