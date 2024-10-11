import clsx from 'clsx';
import { TournamentParticipant } from '@api/TournamentApi';
import UserAvatar from '@components/UserAvatar';
import Typography from '@components/Typography';
import ColoredPoints from '@components/ColoredPoints';
import styles from './TournamentWinner.module.scss';

export interface TournamentWinnerProps {
  className?: string;
  participant: TournamentParticipant;
  placeNumber: number;
}

const TournamentWinner = ({ participant, placeNumber, className }: TournamentWinnerProps) => {
  return (
    <div className={clsx(styles.winner, className)}>
      <UserAvatar className={styles.winnerAvatar} imageUrl={participant.imageUrl} username={participant.username} />
      <Typography color="primary" variant="body2">
        {participant.username}
      </Typography>
      <div className={styles.reward}>
        <ColoredPoints points={participant.points} />
      </div>
      {}
      <div className={styles.zeroCircle}>
        <div className={styles.firstCircle}>
          <div className={styles.secondCircle}>
            <div className={styles.thirdCircle}>
              <Typography color="primary" variant="body1">
                {placeNumber}
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentWinner;
