import { useNavigate } from '@remix-run/react';
import { useState } from 'react';
import { Tournament, TournamentStatus } from '@api/TournamentApi';
import AppSection from '@enums/AppSection';
import useLatestTournamentsQuery from '@hooks/queries/useLatestTournamentsQuery';
import Loader from '@components/Loader';
import TournamentsList from '@components/TournamentsList';
import PageBody from '@components/PageBody';
import ButtonsToggle from '@components/ButtonsToggle';
import ShareTournamentPopup from '@components/ShareTournamentPopup';
import styles from './tournaments.module.scss';

export const handle = {
  appSection: AppSection.Tournaments,
  background: {
    image: '/images/tournament-page-background.png',
    position: 'center',
    overlay: true,
  },
};

const TournamentsPage = () => {
  const [tournamentStatus, setTournamentStatus] = useState<TournamentStatus>(TournamentStatus.Available);

  const [tournamentToShare, setTournamentToShare] = useState<Tournament | null>(null);

  const { data: tournaments } = useLatestTournamentsQuery(tournamentStatus);

  const navigate = useNavigate();

  const handleViewTournamentDetailsClick = (tournament: Tournament) => {
    navigate(`/tournaments/${tournament.id}`);
  };

  return (
    <PageBody>
      <ButtonsToggle
        className={styles.buttonsToggle}
        onSwitch={(status) => setTournamentStatus(status as TournamentStatus)}
        toggles={[
          {
            title: 'Available',
            id: TournamentStatus.Available,
          },
          {
            title: 'Finished',
            id: TournamentStatus.Finished,
          },
        ]}
        selectedId={tournamentStatus}
      />
      {tournaments ? (
        <TournamentsList
          tournaments={tournaments}
          onViewTournamentDetailsClick={handleViewTournamentDetailsClick}
          onShareTournamentClick={(tournament) => setTournamentToShare(tournament)}
        />
      ) : (
        <Loader centered />
      )}
      <ShareTournamentPopup
        tournament={tournamentToShare}
        isOpen={!!tournamentToShare}
        onClose={() => setTournamentToShare(null)}
      />
    </PageBody>
  );
};

export default TournamentsPage;
