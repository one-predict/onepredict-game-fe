import { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import { PortfolioOffer } from '@api/PortfolioOfferApi';
import usePortfolioOffersQuery from '@hooks/queries/usePortfolioOffersQuery';
import useUserPortfoliosQuery from '@hooks/queries/useUserPortfoliosQuery';
import useCreatePortfolioMutation from '@hooks/mutations/useCreatePortfolioMutation';
import useCurrentUserRank from '@hooks/queries/useCurrentUserRankQuery';
import PageLayout from '@components/PageLayout';
import PortfolioOffers from '@components/PortfolioOffers';
import ChoosePortfolio from '@components/ChoosePortfolio';
import Typography from '@components/Typography';

const StyledYourPoints = styled(Typography)`
  margin-bottom: 20px;
  color: transparent;
  background: linear-gradient(90deg, #A049C9 0%, #FF00FF 100%);
  background-clip: text;
  -webkit-background-clip: text;
  
  @media (${({ theme }) => theme.devices.tablet}) {
    margin-bottom: 60px;
  }
`

const PortfolioOffersPage = () => {
  const [selectedOffer, setSelectedOffer] = useState<PortfolioOffer | null>(
    null,
  );

  const { data: offers } = usePortfolioOffersQuery();

  const offerIds = useMemo(() => {
    return offers?.map((offer) => offer.id);
  }, [offers]);

  const { data: portfolios } = useUserPortfoliosQuery(offerIds);
  const { data: rank } = useCurrentUserRank();

  const {
    status: createPortfolioStatus,
    mutate: createPortfolio,
  } = useCreatePortfolioMutation();

  const handleSelectOffer = useCallback((offer: PortfolioOffer) => {
    setSelectedOffer(offer);
  }, []);

  const handleResetPortfolioCreation = useCallback(() => {
    setSelectedOffer(null);
  }, []);

  const handleSubmitPortfolio = useCallback(async (offerId: string, selectedTokens: string[]) => {
    await createPortfolio({
      offerId,
      selectedTokens,
    }, {
      onSuccess: () => setSelectedOffer(null),
    });
  }, [createPortfolio]);

  return (
    <PageLayout>
      <StyledYourPoints variant="h1">Your rank is {rank ?? '-'}</StyledYourPoints>
      {selectedOffer ? (
        <ChoosePortfolio
          offer={selectedOffer}
          onSubmit={handleSubmitPortfolio}
          onResetButtonClick={handleResetPortfolioCreation}
          isPortfolioCreationInProgress={createPortfolioStatus === 'pending'}
        />
      ) : (
        <PortfolioOffers
          offers={offers ?? null}
          portfolios={portfolios ?? null}
          onSelectOffer={handleSelectOffer}
        />
      )}
    </PageLayout>
  );
};

export default PortfolioOffersPage;
