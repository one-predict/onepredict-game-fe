import { useNavigate } from '@remix-run/react';
import { Tournament } from '@api/TournamentApi';
import useLatestTournamentsQuery from '@hooks/queries/useLatestTournamentsQuery';
import Loader from '@components/Loader';
import TournamentsList from '@components/TournamentsList';
import styles from './tournaments.module.scss';

const TournamentsPage = () => {
  const { data: tournaments } = useLatestTournamentsQuery();

  const navigate = useNavigate();

  const handleViewTournamentDetailsClick = (tournament: Tournament) => {
    navigate(`/tournaments/${tournament.displayId}`);
  };

  return (
    <>
      {tournaments ? (
        <TournamentsList
          className={styles.tournamentsList}
          tournaments={tournaments}
          onViewTournamentDetailsClick={handleViewTournamentDetailsClick}
        />
      ) : (
        <div className={styles.loaderContainer}>
          <Loader />
        </div>
      )}
    </>
  );
};

export default TournamentsPage;
