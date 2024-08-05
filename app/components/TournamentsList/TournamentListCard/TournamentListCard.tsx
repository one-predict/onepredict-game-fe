import { Tournament } from '@api/TournamentApi';
import Button from '@components/Button';
import Typography from '@components/Typography';
import TournamentAvailabilityInfo from '@components/TournamentAvailabilityInfo';
import styles from './TournamentListCard.module.scss';

export interface TournamentListCardProps {
  tournament: Tournament;
  onViewDetailsClick: (tournament: Tournament) => void;
}

const TournamentListCard = ({ tournament, onViewDetailsClick }: TournamentListCardProps) => {
  const prizePool = tournament.entryPrice * tournament.participantsCount + tournament.staticPrizePool;

  return (
    <div className={styles.tournamentListCard}>
      <TournamentAvailabilityInfo className={styles.tournamentAvailabilityInfo} tournament={tournament} />
      <Typography variant="h1" color="gradient2">
        Weekly
      </Typography>
      <Typography className={styles.prizePoolText} variant="h6">
        Prize Pool {prizePool} AIP
      </Typography>
      <img width={94} height={94} src="/images/aipick-coin.png" className={styles.aipickCoinImage} alt="aipick-coin" />
      <div className={styles.aipickImageShadow} />
      <Button className={styles.viewDetailsButton} onClick={() => onViewDetailsClick(tournament)}>
        View Details
      </Button>
    </div>
  );
};

export default TournamentListCard;
