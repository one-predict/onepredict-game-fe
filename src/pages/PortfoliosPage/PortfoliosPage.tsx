import { useCallback, useMemo, useState } from 'react';
import { keyBy } from 'lodash';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import useLatestPortfolioOffersQuery from '@hooks/queries/useLatestPortfolioOffersQuery';
import useUserPortfoliosQuery from '@hooks/queries/useUserPortfoliosQuery';
import useCreatePortfolioMutation from '@hooks/mutations/useCreatePortfolioMutation';
import { PageLayoutWithMenu } from '@components/Layouts';
import { GradientTypography } from '@components/Typography';
import ButtonsToggle from '@components/ButtonsToggle';
import UserBadge from '@components/UserBadge';
import PortfolioOfferCard from '@components/PortfolioOfferCard';
import SubmitPortfolio from '@components/SubmitPortfolio';
import LivePortfolioOfferCard from '@components/LivePortfolioOfferCard';
import FinishedPortfolioOffers from '@components/FinishedPortfolioOffers';
import Loader from '@components/Loader';

type OffersCategory = 'upcoming' | 'live' | 'finished';

const PortfoliosPageHead = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  row-gap: 16px;

  @media (${({ theme }) => theme.devices.desktop}) {
    flex-direction: row;
    justify-content: space-between;
    column-gap: 30px;
    margin-bottom: 48px;
  }
`;

const PortfoliosPageBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  
  @media (${({ theme }) => theme.devices.desktop}) {
    width: 750px;
    margin: 0 auto;
  }
`;

const StyledOffersCategoryToggle = styled(ButtonsToggle)`
  width: 100%;
  
  @media (${({ theme }) => theme.devices.desktop}) {
    max-width: 500px;
  }
`;

const StyledUpcomingPortfolioOfferContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 16px;
  width: 100%;
  height: 100%;
`;

const PortfoliosPage = () => {
  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState<OffersCategory>('upcoming');

  const { data: offers } = useLatestPortfolioOffersQuery();

  const offerIds = useMemo(() => {
    return offers?.map((offer) => offer.id);
  }, [offers]);

  const { data: portfolios } = useUserPortfoliosQuery(offerIds);

  const portfoliosMap = useMemo(() => keyBy(portfolios, 'offerId'), [portfolios]);

  const {
    status: createPortfolioStatus,
    mutate: createPortfolio,
  } = useCreatePortfolioMutation();

  const handleSubmitPortfolio = useCallback(async (offerId: string, selectedTokens: string[]) => {
    await createPortfolio({
      offerId,
      selectedTokens,
    });

    toast('Portfolio submitted successfully!');
  }, [createPortfolio]);

  const renderOffersCategory = () => {
    if (!offers || !portfolios) {
      return (
        <Loader />
      );
    }

    const [upcomingOffer, liveOffer, ...finishedOffers] = offers;

    if (selectedCategory === 'upcoming') {
      const upcomingPortfolio = portfoliosMap[upcomingOffer.id];

      return upcomingPortfolio ? (
        <StyledUpcomingPortfolioOfferContainer>
          <GradientTypography variant="h1">Your choice today</GradientTypography>
          <PortfolioOfferCard offer={upcomingOffer} selectedTokensMap={upcomingPortfolio.selectedTokens} />
        </StyledUpcomingPortfolioOfferContainer>
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

      return (
        <LivePortfolioOfferCard offer={liveOffer} portfolio={livePortfolio} />
      );
    }

    return (
      <FinishedPortfolioOffers
        portfoliosMap={portfoliosMap}
        offers={finishedOffers}
      />
    );
  };

  return (
    <PageLayoutWithMenu pageTitle="Portfolios" backHref="/">
      <PortfoliosPageHead>
        <UserBadge />
        <StyledOffersCategoryToggle
          onSwitch={(category) => setSelectedCategory(category as OffersCategory)}
          toggles={[{
            title: 'Upcoming',
            id: 'upcoming',
          }, {
            title: 'Live',
            id: 'live',
          }, {
            title: 'Finished',
            id: 'finished',
          }]}
          selectedId={selectedCategory}
        />
      </PortfoliosPageHead>
      <PortfoliosPageBody>
        {renderOffersCategory()}
      </PortfoliosPageBody>
    </PageLayoutWithMenu>
  );
};

export default PortfoliosPage;
