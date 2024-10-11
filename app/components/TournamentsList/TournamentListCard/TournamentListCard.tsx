import { Tournament } from '@api/TournamentApi';
import Button from '@components/Button';
import Typography from '@components/Typography';
import TournamentAvailabilityInfo from '@components/TournamentAvailabilityInfo';
import LabeledContent from '@components/LabeledContent';
import CoinsDisplay from '@components/CoinsDisplay';
import styles from './TournamentListCard.module.scss';
import TimeRemaining from '@components/TimeRemaining';

export interface TournamentListCardProps {
  tournament: Tournament;
  onViewDetailsClick: (tournament: Tournament) => void;
}

const REGISTRATION_ENDS_UPDATE_INTERVAL = 1000;

const TournamentListCard = ({ tournament, onViewDetailsClick }: TournamentListCardProps) => {
  const prizePool = tournament.entryPrice * tournament.participantsCount + tournament.staticPrizePool;

  return (
    <div className={styles.tournamentListCard}>
      <TournamentAvailabilityInfo className={styles.tournamentAvailabilityInfo} tournament={tournament} />
      <div className={styles.titleWithParticipantsContainer}>
        <Typography variant="h1" color="gradient1">
          {tournament.title}
        </Typography>
        <LabeledContent row title="Participants:">
          <Typography variant="body2">{tournament.participantsCount}</Typography>
        </LabeledContent>
      </div>
      <img src={tournament.imageUrl} className={styles.tournamentImage} alt={`${tournament.id}-image`} />
      <div className={styles.tournamentImageShadow} />
      <div className={styles.tournamentPrizeInfo}>
        <LabeledContent title="Prize Pool">
          <CoinsDisplay variant="body2" coins={prizePool} />
        </LabeledContent>
        <LabeledContent title="Entry Fee">
          <CoinsDisplay variant="body2" coins={tournament.entryPrice} />
        </LabeledContent>
      </div>
      <TimeRemaining updateInterval={REGISTRATION_ENDS_UPDATE_INTERVAL} unixTimestamp={tournament.joinCloseTimestamp}>
        {({ displayRemainingHours, displayRemainingMinutes, displayRemainingSeconds }) => {
          return (
            <Typography className={styles.registrationInfo} color="gray" variant="subtitle2">
              Registration Ends in {displayRemainingHours}h, {displayRemainingMinutes}m, {displayRemainingSeconds}s
            </Typography>
          );
        }}
      </TimeRemaining>
      <Button className={styles.viewDetailsButton} onClick={() => onViewDetailsClick(tournament)}>
        View Details
      </Button>
    </div>
  );
};

export default TournamentListCard;
