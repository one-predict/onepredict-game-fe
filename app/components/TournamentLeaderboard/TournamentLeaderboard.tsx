import Typography from '@components/Typography';
import TournamentParticipantsTable from './TournamentParticipantsTable';
import styles from './TournamentLeaderboard.module.scss';
import TournamentWinners from './TournamentWinners';

export interface TournamentLeaderboardProps {
  rankedParticipants: Array<{
    id: string;
    username: string;
    imageUrl: string;
    points: number;
  }>;
}

const TournamentLeaderboard = ({ rankedParticipants }: TournamentLeaderboardProps) => {
  return (
    <div className={styles.tournamentLeaderboard}>
      <Typography color="primary" variant="h2">
        Leaderboard
      </Typography>
      {rankedParticipants.length ? (
        <>
          <TournamentWinners rankedParticipants={rankedParticipants}></TournamentWinners>
          <TournamentParticipantsTable className={styles.participantsTable} rankedParticipants={rankedParticipants} />
        </>
      ) : (
        <Typography className={styles.noParticipantsText} alignment="center" color="gradient2" variant="h4">
          No participants yet!
        </Typography>
      )}
    </div>
  );
};

export default TournamentLeaderboard;
