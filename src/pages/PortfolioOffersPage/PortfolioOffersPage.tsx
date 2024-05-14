import { useCallback, useMemo, useState } from 'react';
import { PortfolioOffer } from '@api/PortfolioOfferApi';
import usePortfolioOffersQuery from '@hooks/queries/usePortfolioOffersQuery';
import useUserPortfoliosQuery from '@hooks/queries/useUserPortfoliosQuery';
import useCreatePortfolioMutation from '@hooks/mutations/useCreatePortfolioMutation';
import PageLayout from '@components/PageLayout';
import PortfolioOffers from '@components/PortfolioOffers';
import ChoosePortfolio from '@components/ChoosePortfolio';

const PortfolioOffersPage = () => {
  const [selectedOffer, setSelectedOffer] = useState<PortfolioOffer | null>(
    null,
  );

  const { data: offers } = usePortfolioOffersQuery();

  const offerIds = useMemo(() => {
    return offers?.map((offer) => offer.id);
  }, [offers]);

  const { data: portfolios } = useUserPortfoliosQuery(offerIds);

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
