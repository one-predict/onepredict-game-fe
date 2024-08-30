import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from '@remix-run/react';
import useBackButton from '@hooks/useBackButton';
import AppSection from '@enums/AppSection';
import PageBody from '@components/PageBody';
import Typography from '@components/Typography';
import FixedSlideView from '@components/FixedSlideView';
import RewardIcon from '@assets/icons/reward.svg?react';
import CupIcon from '@assets/icons/cup.svg?react';
import styles from './home.module.scss';
import PortfoliosGame from '@components/PortfoliosGame';
import useLatestTokensOffersQuery from '@hooks/queries/useLatestTokensOffersQuery';
import useMyPortfoliosQuery from '@hooks/queries/useMyPortfoliosQuery';
import useCreatePortfolioMutation from '@hooks/mutations/useCreatePortfolioMutation';
import { PortfolioSelectedToken } from '@api/PortfolioApi';

export const handle = {
  appSection: AppSection.Home,
};

const HomePage = () => {
  const navigate = useNavigate();

  const [showMainGame, setShowMainGame] = useState(false);

  useBackButton(showMainGame, () => {
    setShowMainGame(false);
  }, [showMainGame]);

  const { data: offers } = useLatestTokensOffersQuery(null);

  const offerIds = useMemo(() => {
    return offers?.map((offer) => offer.id);
  }, [offers]);

  const { data: portfolios } = useMyPortfoliosQuery(offerIds);

  const { mutateAsync: createPortfolio, status: createPortfolioStatus } = useCreatePortfolioMutation();

  const handlePortfolioSubmit = useCallback(
    async (offerId: string, selectedTokens: PortfolioSelectedToken[]) => {
      await createPortfolio({ offerId, selectedTokens });
    },
    [createPortfolio],
  );

  return (
    <PageBody>
      <Typography variant="h1" alignment="center" color="gradient1">
        Welcome to AiPick
      </Typography>
      <div className={styles.buttons}>
        <div onClick={() => setShowMainGame(true)} className={styles.earnPointsButton}>
          <RewardIcon />
          <Typography variant="h2">Earn Points</Typography>
        </div>
        <div onClick={() => navigate('/tournaments')} className={styles.tournaments}>
          <CupIcon />
          <Typography alignment="center" variant="h2">
            Compete With Others
          </Typography>
        </div>
      </div>
      <FixedSlideView visible={showMainGame}>
        {showMainGame && (
          <PortfoliosGame
            className={styles.portfoliosGame}
            offers={offers}
            portfolios={portfolios}
            onPortfolioSubmit={handlePortfolioSubmit}
            isPortfolioSubmitInProgress={createPortfolioStatus === 'pending'}
          />
        )}
      </FixedSlideView>
    </PageBody>
  );
};

export default HomePage;
