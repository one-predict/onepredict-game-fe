import { TournamentParticipant } from '@api/TournamentApi';
import TournamentWinner from './TournamentWinner';
import styles from './TournamentWinners.module.scss';

export interface TournamentParticipantsTableProps {
  className?: string;
  rankedParticipants: Array<TournamentParticipant>;
}

const TournamentWinners = ({ rankedParticipants }: TournamentParticipantsTableProps) => {
  const [firstPlace, secondPlace, thirdPlace] = rankedParticipants;

  return (
    <div className={styles.winnersContainer}>
      {secondPlace && <TournamentWinner participant={rankedParticipants[1]} placeNumber={2} />}
      {firstPlace && <TournamentWinner participant={rankedParticipants[0]} isFirstPlace={true} placeNumber={1} />}
      {thirdPlace && <TournamentWinner participant={rankedParticipants[2]} placeNumber={3} />}
    </div>
  );
};

export default TournamentWinners;
