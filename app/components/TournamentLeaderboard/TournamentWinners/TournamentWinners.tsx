import Table from '@components/Table';
import { TournamentParticipant } from '@api/TournamentApi';
import TournamentWinner from './TournamentWinner';
import styles from './TournamentWinners.module.scss';

export interface TournamentParticipantsTableProps {
  className?: string;
  rankedParticipants: Array<TournamentParticipant>;
}

const TournamentWinners = ({ className, rankedParticipants }: TournamentParticipantsTableProps) => {
  return (
    <div className={styles.winnersContainer}>
      <TournamentWinner participant={rankedParticipants[1]} placeNumber={2} />
      <TournamentWinner participant={rankedParticipants[0]} isFirstPlace={true} placeNumber={1} />
      <TournamentWinner participant={rankedParticipants[2]} placeNumber={3} />
    </div>
  );
};

export default TournamentWinners;
