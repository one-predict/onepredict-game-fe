import { useMemo } from 'react';
import Typography from '@components/Typography';
import TournamentParticipantsTable from './TournamentParticipantsTable';
import TournamentWinners from './TournamentWinners';
import styles from './TournamentLeaderboard.module.scss';

export interface TournamentLeaderboardProps {
  rankedParticipants: Array<{
    id: string;
    username: string;
    imageUrl: string;
    points: number;
  }>;
}

const WINNERS_COUNT = 3;

const TournamentLeaderboard = ({ rankedParticipants }: TournamentLeaderboardProps) => {
  const [winners, restParticipants] = useMemo(() => {
    const winners = rankedParticipants.slice(0, WINNERS_COUNT);
    const restParticipants = rankedParticipants.slice(WINNERS_COUNT);

    return [winners, restParticipants];
  }, [rankedParticipants]);

  return (
    <div className={styles.tournamentLeaderboard}>
      <Typography color="primary" variant="h2">
        Leaderboard
      </Typography>
      {rankedParticipants.length ? (
        <>
          <TournamentWinners className={styles.tournamentWinners} winners={winners} />
          <TournamentParticipantsTable
            startsFrom={WINNERS_COUNT}
            className={styles.participantsTable}
            rankedParticipants={restParticipants}
          />
        </>
      ) : (
        <Typography className={styles.noParticipantsText} alignment="center" color="gray" variant="h4">
          No participants yet!
        </Typography>
      )}
    </div>
  );
};

export default TournamentLeaderboard;
