import { useCallback, useMemo, useState } from 'react';
import lodash from 'lodash';
import { toast } from 'react-toastify';
import useLatestPortfolioOffersQuery from '@hooks/queries/useLatestPortfolioOffersQuery';
import useUserPortfoliosQuery from '@hooks/queries/useUserPortfoliosQuery';
import useCreatePortfolioMutation from '@hooks/mutations/useCreatePortfolioMutation';
import Typography from '@components/Typography';
import ButtonsToggle from '@components/ButtonsToggle';
import UserBadge from '@components/UserBadge';
import PortfolioOfferCard from '@components/PortfolioOfferCard';
import SubmitPortfolio from '@components/SubmitPortfolio';
import LivePortfolioOfferCard from '@components/LivePortfolioOfferCard';
import FinishedPortfolioOffers from '@components/FinishedPortfolioOffers';
import Loader from '@components/Loader';
import styles from './portfolios.module.scss';

type OffersCategory = 'upcoming' | 'live' | 'finished';

export const handle = {
  pageTitle: 'Portfolios',
  backHref: '/',
};

const PortfoliosPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<OffersCategory>('upcoming');

  const { data: offers } = useLatestPortfolioOffersQuery();

  const offerIds = useMemo(() => {
    return offers?.map((offer) => offer.id);
  }, [offers]);

  const { data: portfolios } = useUserPortfoliosQuery(offerIds);

  const portfoliosMap = useMemo(() => lodash.keyBy(portfolios, 'offerId'), [portfolios]);

  const { status: createPortfolioStatus, mutate: createPortfolio } = useCreatePortfolioMutation();

  const handleSubmitPortfolio = useCallback(
    async (offerId: string, selectedTokens: string[]) => {
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
      return <Loader />;
    }

    const [upcomingOffer, liveOffer, ...finishedOffers] = offers;

    if (selectedCategory === 'upcoming') {
      const upcomingPortfolio = portfoliosMap[upcomingOffer.id];

      return upcomingPortfolio ? (
        <div className={styles.upcomingPortfolioOffer}>
          <Typography variant="h1">Your choice today</Typography>
          <PortfolioOfferCard offer={upcomingOffer} selectedTokensMap={upcomingPortfolio.selectedTokens} />
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

      return <LivePortfolioOfferCard offer={liveOffer} portfolio={livePortfolio} />;
    }

    return <FinishedPortfolioOffers portfoliosMap={portfoliosMap} offers={finishedOffers} />;
  };

  return (
    <>
      <div className={styles.portfoliosPageHead}>
        <UserBadge />
        <ButtonsToggle
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
      </div>
      <div className={styles.portfoliosPageBody}>{renderOffersCategory()}</div>
    </>
  );
};

export default PortfoliosPage;
