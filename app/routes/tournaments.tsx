import { useNavigate } from '@remix-run/react';
import { Tournament } from '@api/TournamentApi';
import AppSection from '@enums/AppSection';
import useLatestTournamentsQuery from '@hooks/queries/useLatestTournamentsQuery';
import Loader from '@components/Loader';
import TournamentsList from '@components/TournamentsList';
import PageBody from '@components/PageBody';
import styles from './tournaments.module.scss';

export const handle = {
  appSection: AppSection.Tournaments,
};

const TournamentsPage = () => {
  const { data: tournaments } = useLatestTournamentsQuery();

  const navigate = useNavigate();

  const handleViewTournamentDetailsClick = (tournament: Tournament) => {
    navigate(`/tournaments/${tournament.displayId}`);
  };

  return (
    <PageBody>
      {tournaments ? (
        <TournamentsList tournaments={tournaments} onViewTournamentDetailsClick={handleViewTournamentDetailsClick} />
      ) : (
        <div className={styles.loaderContainer}>
          <Loader />
        </div>
      )}
    </PageBody>
  );
};

export default TournamentsPage;
