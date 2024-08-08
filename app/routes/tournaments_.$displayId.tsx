import { toast } from 'react-toastify';
import { useParams } from '@remix-run/react';
import Typography from '@components/Typography';
import Loader from '@components/Loader';
import TournamentLeaderboard from '@components/TournamentLeaderboard/TournamentLeaderboard';
import ColoredPoints from '@components/ColoredPoints';
import LabeledContent from '@components/LabeledContent';
import useTournamentQuery from '@hooks/queries/useTournamentQuery';
import useTournamentParticipationRankQuery from '@hooks/queries/useTournamentParticipationRankQuery';
import useTournamentParticipationQuery from '@hooks/queries/useTournamentParticipationQuery';
import useTournamentLeaderboardQuery from '@hooks/queries/useTournamentLeaderboardQuery';
import useJoinTournamentMutation from '@hooks/mutations/useJoinTournamentMutation';
import useTournamentStatus from '@hooks/useTournamentStatus';
import useSession from '@hooks/useSession';
import styles from './tournament.module.scss';

export const handle = {
  backHref: '/tournaments',
};

const TournamentPage = () => {
  const { displayId } = useParams<{ displayId: string }>();

  const currentUser = useSession();

  const { data: tournament } = useTournamentQuery(displayId || '');

  const { data: tournamentParticipation } = useTournamentParticipationQuery(tournament?.id || '');

  const { data: tournamentParticipationRank } = useTournamentParticipationRankQuery(tournament?.id || '');

  const { data: tournamentLeaderboard } = useTournamentLeaderboardQuery(tournament?.id || '');

  const { mutate: joinTournament, status: joinTournamentMutationStatus } = useJoinTournamentMutation();

  const tournamentStatus = useTournamentStatus(tournament ?? null);

  const handleJoinTournamentButtonClick = async () => {
    if (!tournament) {
      return;
    }

    await joinTournament(tournament.id);

    toast(`You have successfully joined the tournament!`);
  };

  const renderParticipationContent = () => {
    if (!tournament || tournamentParticipation === undefined || tournamentParticipationRank === undefined) {
      return null;
    }

    if (tournamentParticipation === null) {
      return <Typography>—</Typography>;
    }

    return (
      <>
        <Typography variant="h1">{tournamentParticipationRank}</Typography>
        <ColoredPoints points={tournamentParticipation.points} />
      </>
    );
  };

  return (
    <>
      <div className={styles.tournamentPageHead}>
        <LabeledContent title="Rank">{renderParticipationContent()}</LabeledContent>
      </div>
      <div className={styles.tournamentPageBody}>
        {tournament && tournamentLeaderboard && tournamentParticipation !== undefined ? (
          <TournamentLeaderboard
            tournament={tournament}
            hasParticipation={!!tournamentParticipation}
            isTournamentJoiningInProgress={joinTournamentMutationStatus === 'pending'}
            canJoinTournament={
              tournamentStatus === 'live' && !!currentUser && currentUser.coinsBalance > tournament.entryPrice
            }
            onJoinTournamentButtonClick={handleJoinTournamentButtonClick}
            rankedParticipants={tournamentLeaderboard.rankedParticipants}
          />
        ) : (
          <div className={styles.loaderContainer}>
            <Loader />
          </div>
        )}
      </div>
    </>
  );
};

export default TournamentPage;
