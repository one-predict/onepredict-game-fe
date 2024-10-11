import clsx from 'clsx';
import { TournamentParticipant } from '@api/TournamentApi';
import TournamentWinner from './TournamentWinner';
import styles from './TournamentWinners.module.scss';

export interface TournamentParticipantsTableProps {
  className?: string;
  winners: TournamentParticipant[];
}

const TournamentWinners = ({ className, winners }: TournamentParticipantsTableProps) => {
  return (
    <div className={styles.winnersContainer}>
      {winners.map((winner, index) => {
        return (
          <TournamentWinner
            className={clsx(styles.winner, className)}
            key={winner.id}
            participant={winner}
            placeNumber={index + 1}
          />
        );
      })}
    </div>
  );
};

export default TournamentWinners;
