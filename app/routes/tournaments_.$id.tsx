import { useCallback, useState } from 'react';
import { useNavigate, useParams } from '@remix-run/react';
import AppSection from '@enums/AppSection';
import DigitalAssetPricePrediction from '@types/DigitalAssetPricePrediction';
import useOfferIdsFromSeries from '@hooks/useOfferIdsFromSeries';
import useTournamentByIdQuery from '@hooks/queries/useTournamentByIdQuery';
import useTournamentParticipationRankQuery from '@hooks/queries/useTournamentParticipationRankQuery';
import useTournamentParticipationQuery from '@hooks/queries/useTournamentParticipationQuery';
import useTournamentLeaderboardQuery from '@hooks/queries/useTournamentLeaderboardQuery';
import useSession from '@hooks/useSession';
import useTokensOffersSeriesQuery from '@hooks/queries/useTokensOffersSeriesQuery';
import useMyPortfoliosQuery from '@hooks/queries/useMyPortfoliosQuery';
import useBackButton from '@hooks/useBackButton';
import useJoinTournamentMutation from '@hooks/mutations/useJoinTournamentMutation';
import useCreatePortfolioMutation from '@hooks/mutations/useCreatePortfolioMutation';
import PageBody from '@components/PageBody';
import Typography from '@components/Typography';
import Loader from '@components/Loader';
import LabeledContent from '@components/LabeledContent';
import TournamentDetails from '@components/TournamentDetails';
import PortfoliosGame from '@components/PortfoliosGame';
import FixedSlideView from '@components/FixedSlideView';
import styles from './tournament.module.scss';

export const handle = {
  appSection: AppSection.Tournaments,
};

const TournamentPage = () => {
  const navigate = useNavigate();

  const { id: tournamentId } = useParams<{ id: string }>();

  const [showPortfolios, setShowPortfolios] = useState(false);

  const currentUser = useSession();

  const { data: tournament } = useTournamentByIdQuery(tournamentId || '');
  const { data: tournamentParticipation } = useTournamentParticipationQuery(tournament?.id || '');
  const { data: tournamentParticipationRank } = useTournamentParticipationRankQuery(tournament?.id || '');
  const { data: tournamentLeaderboard } = useTournamentLeaderboardQuery(tournament?.id || '');
  const { data: offersSeries } = useTokensOffersSeriesQuery(tournamentId);

  const tournamentOfferIds = useOfferIdsFromSeries(offersSeries);

  const { data: portfolios } = useMyPortfoliosQuery(tournamentOfferIds);

  const { mutateAsync: joinTournament, status: joinTournamentMutationStatus } = useJoinTournamentMutation();
  const { mutateAsync: createPortfolio, status: createPortfolioStatus } = useCreatePortfolioMutation();

<<<<<<< Updated upstream
  const canJoinTournament = !!currentUser && currentUser.coinsBalance > tournament?.entryPrice;
=======
  const canJoinTournament =
    tournament?.isTonConnected || (!!currentUser && currentUser.coinsBalance > tournament?.entryPrice);
>>>>>>> Stashed changes

  useBackButton(
    true,
    () => {
      if (showPortfolios) {
        setShowPortfolios(false);

        return;
      }

      navigate('/tournaments');
    },
    [showPortfolios],
  );

  const handleJoinTournamentButtonClick = useCallback(async () => {
    if (!tournament) {
      return;
    }

    await joinTournament(tournament.id);
  }, [joinTournament, tournament]);

  const handlePortfoliosButtonClick = useCallback(() => {
    setShowPortfolios(true);
  }, [setShowPortfolios]);

  const handlePortfolioSubmit = useCallback(
    async (offerId: string, predictions: DigitalAssetPricePrediction[]) => {
      if (!tournamentId) {
        return;
      }

      await createPortfolio({ offerId, tournamentId, predictions });
    },
    [createPortfolio, tournamentId],
  );

  return (
    <PageBody className={styles.pageBody}>
      {tournament && tournamentParticipation !== undefined ? (
        <TournamentDetails
          tournament={tournament}
          tournamentLeaderboard={tournamentLeaderboard}
          tournamentParticipation={tournamentParticipation}
          tournamentOffersSeries={offersSeries}
          portfolios={portfolios}
          offersSeries={offersSeries ?? null}
          joinTournamentMutationStatus={joinTournamentMutationStatus}
          tournamentParticipationRank={tournamentParticipationRank}
          currentUser={currentUser}
          canJoinTournament={canJoinTournament}
          onPortfolioSubmit={handlePortfolioSubmit}
          isTournamentJoiningInProgress={joinTournamentMutationStatus === 'pending'}
          onJoinTournamentButtonClick={handleJoinTournamentButtonClick}
          onPortfoliosButtonClick={handlePortfoliosButtonClick}
        />
      ) : (
        <Loader centered />
      )}
      <FixedSlideView visible={showPortfolios} onClose={() => setShowPortfolios(false)}>
        {showPortfolios && (
          <>
            <LabeledContent className={styles.portfoliosTournamentDescription} row title="Tournament:">
              <Typography variant="h6">{tournament?.title}</Typography>
            </LabeledContent>
            <PortfoliosGame
              className={styles.portfoliosGame}
              offersSeries={offersSeries ?? null}
              portfolios={portfolios ?? null}
              onPortfolioSubmit={handlePortfolioSubmit}
              isPortfolioSubmitInProgress={createPortfolioStatus === 'pending'}
            />
          </>
        )}
      </FixedSlideView>
    </PageBody>
  );
};

export default TournamentPage;
