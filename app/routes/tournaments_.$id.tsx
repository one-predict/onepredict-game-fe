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
import Loader from '@components/Loader';
import TournamentDetails from '@components/TournamentDetails';
import styles from './tournament.module.scss';

export const handle = {
  appSection: AppSection.Tournaments,
};

const TournamentPage = () => {
  const navigate = useNavigate();

  const { id: tournamentId } = useParams<{ id: string }>();

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

  const canJoinTournament =
    tournament?.isTonConnected || (!!currentUser && currentUser.coinsBalance > tournament?.entryPrice);

  useBackButton(
    true,
    () => {
      navigate('/tournaments');
    },
    [],
  );

  const handleJoinTournamentButtonClick = useCallback(
    async (walletAddress?: string) => {
      if (!tournament) {
        return;
      }

      await joinTournament({ tournamentId: tournament.id, walletAddress: walletAddress || '' });
    },
    [joinTournament, tournament],
  );

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
          isPortfolioSubmitInProgress={createPortfolioStatus === 'pending'}
        />
      ) : (
        <Loader centered />
      )}
    </PageBody>
  );
};

export default TournamentPage;
