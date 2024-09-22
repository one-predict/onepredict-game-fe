import { TournamentParticipant } from '@api/TournamentApi';
import UserAvatar from '@app/components/UserAvatar';
import styles from './TournamentWinner.module.scss';
import Typography from '@app/components/Typography';

export interface TournamentWinnerProps {
  className?: string;
  participant: TournamentParticipant;
  isFirstPlace?: boolean;
  placeNumber: number;
}

const TournamentWinner = ({ className, participant, isFirstPlace, placeNumber }: TournamentWinnerProps) => {
  const getPlace = () => {
    if (isFirstPlace) {
      return (
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
      );
    } else {
      return (
        <div className={styles.firstCircle}>
          <div className={styles.secondCircle}>
            <div className={styles.thirdCircle}>
              <Typography color="primary" variant="body1">
                {placeNumber}
              </Typography>
            </div>
          </div>
        </div>
      );
    }
  };
  return (
    <div className={isFirstPlace ? styles.firstPlaceContainer : styles.winnerContainer}>
      <UserAvatar
        className={styles.participantAvatar}
        imageUrl={participant.imageUrl}
        username={participant.username}
      />
      <Typography color="primary" variant="body1">
        {participant.username}
      </Typography>
      <div className={styles.reward}>
        <img src={'/images/token.png'} className={styles.tokenImg}></img>
        <Typography color="primary" variant="body1" className={styles.rewardNumber}>
          0
        </Typography>
      </div>
      {getPlace()}
    </div>
  );
};

export default TournamentWinner;
