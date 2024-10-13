import clsx from 'clsx';
import { Tournament } from '@api/TournamentApi';
import TournamentListCard from './TournamentListCard';
import Typography from '@components/Typography';
import styles from './TournamentsList.module.scss';

export interface TournamentsListProps {
  className?: string;
  tournaments: Tournament[];
  onViewTournamentDetailsClick: (tournament: Tournament) => void;
  onShareTournamentClick?: (tournament: Tournament) => void;
}

const TournamentsList = ({
  className,
  tournaments,
  onViewTournamentDetailsClick,
  onShareTournamentClick,
}: TournamentsListProps) => {
  if (!tournaments.length) {
    return (
      <Typography variant="subtitle1" className={styles.noTournamentsMessage}>
        No tournaments found!
      </Typography>
    );
  }

  return (
    <div className={clsx(styles.tournamentsList, className)}>
      {tournaments.map((tournament) => (
        <TournamentListCard
          key={tournament.id}
          tournament={tournament}
          onViewDetailsClick={onViewTournamentDetailsClick}
          onShareClick={onShareTournamentClick}
        />
      ))}
    </div>
  );
};

export default TournamentsList;
