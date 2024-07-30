import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Tournament } from '@api/TournamentApi';
import useLatestTournamentsQuery from '@hooks/queries/useLatestTournamentsQuery';
import { PageLayoutWithMenu } from '@components/Layouts';
import UserBadge from '@components/UserBadge';
import Loader from '@components/Loader';
import TournamentsList from '@components/TournamentsList';

const StyledTournamentsList = styled(TournamentsList)`
  margin-top: 48px;
  
  @media (${({ theme }) => theme.devices.desktop}) {
    width: 600px;
  }
`;

const StyledLoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const TournamentsPage = () => {
  const {
    data: tournaments,
  } = useLatestTournamentsQuery();

  const navigate = useNavigate();

  const handleViewTournamentDetailsClick = (tournament: Tournament) => {
    navigate(`/tournaments/${tournament.displayId}`);
  };

  return (
    <PageLayoutWithMenu backHref="/" pageTitle="Tournaments">
      <UserBadge />
      {tournaments ? (
        <StyledTournamentsList
          tournaments={tournaments}
          onViewTournamentDetailsClick={handleViewTournamentDetailsClick}
        />
      ) : (
        <StyledLoaderContainer>
          <Loader />
        </StyledLoaderContainer>
      )}
    </PageLayoutWithMenu>
  );
};

export default TournamentsPage;
