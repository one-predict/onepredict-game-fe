import { useNavigate } from '@remix-run/react';
import { Tournament } from '@api/TournamentApi';
import UserBadge from '@components/UserBadge';
import useLatestTournamentsQuery from '@hooks/queries/useLatestTournamentsQuery';
import Loader from '@components/Loader';
import TournamentsList from '@components/TournamentsList';
import styles from './tournaments.module.scss';

export const handle = {
  pageTitle: 'Tournaments',
  backHref: '/',
};

const TournamentsPage = () => {
  const { data: tournaments } = useLatestTournamentsQuery();

  const navigate = useNavigate();

  const handleViewTournamentDetailsClick = (tournament: Tournament) => {
    navigate(`/tournaments/${tournament.displayId}`);
  };

  return (
    <>
      <UserBadge />
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
