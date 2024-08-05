import { Tournament } from '@api/TournamentApi';
import Typography from '@components/Typography';
import TournamentParticipantsTable from '@components/TournamentLeaderboard/TournamentParticipantsTable';
import LabeledContent from '@components/LabeledContent';
import TournamentAvailabilityInfo from '@components/TournamentAvailabilityInfo';
import Button from '@components/Button';
import styles from './TournamentLeaderboard.module.scss';

export interface TournamentLeaderboardProps {
  tournament: Tournament;
  hasParticipation: boolean;
  canJoinTournament: boolean;
  onJoinTournamentButtonClick: () => void;
  rankedParticipants: Array<{
    id: string;
    username: string;
    imageUrl: string;
    points: number;
  }>;
  isTournamentJoiningInProgress?: boolean;
}

const TournamentLeaderboard = ({
  tournament,
  canJoinTournament,
  onJoinTournamentButtonClick,
  rankedParticipants,
  hasParticipation,
  isTournamentJoiningInProgress,
}: TournamentLeaderboardProps) => {
  return (
    <div className={styles.tournamentLeaderboard}>
      <TournamentAvailabilityInfo className={styles.tournamentAvailabilityInfo} tournament={tournament} />
      <Typography color="gradient2" variant="h1">
        Leaderboard
      </Typography>
      {!hasParticipation && (
        <div className={styles.participationInfo}>
          <Typography variant="h4">You're not a participant of tournament:</Typography>
          <Button
            className={styles.joinTournamentButton}
            disabled={!canJoinTournament}
            onClick={onJoinTournamentButtonClick}
            loading={isTournamentJoiningInProgress}
          >
            Join for {tournament.entryPrice} AIP
          </Button>
        </div>
      )}
      <div className={styles.tournamentLeaderboardSubheader}>
        <LabeledContent title="Prize Pool">
          <Typography variant="h3">
            {tournament.participantsCount * tournament.entryPrice + tournament.staticPrizePool} AIP
          </Typography>
        </LabeledContent>
        <LabeledContent title="Count of Players">
          <Typography alignment="right" variant="h3">
            {tournament.participantsCount}
          </Typography>
        </LabeledContent>
      </div>
      {rankedParticipants.length ? (
        <TournamentParticipantsTable rankedParticipants={rankedParticipants} />
      ) : (
        <Typography alignment="center" variant="h4">
          No participants yet!
        </Typography>
      )}
    </div>
  );
};

export default TournamentLeaderboard;
