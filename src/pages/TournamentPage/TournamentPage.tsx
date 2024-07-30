import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { PageLayoutWithMenu } from '@components/Layouts';
import Typography from '@components/Typography';
import UserBadge from '@components/UserBadge';
import Loader from '@components/Loader';
import TournamentLeaderboard from '@components/TournamentLeaderboard/TournamentLeaderboard';
import ColoredPoints from '@components/ColoredPoints';
import LabeledContent from '@components/LabeledContent';
import useTournamentQuery from '@hooks/queries/useTournamentQuery';
import useTournamentParticipationRankQuery from '@hooks/queries/useTournamentParticipationRankQuery';
import useTournamentParticipationQuery from '@hooks/queries/useTournamentParticipationQuery';
import useTournamentLeaderboardQuery from '@hooks/queries/useTournamentLeaderboardQuery';
import useJoinTournamentMutation from '@hooks/mutations/useJoinTournamentMutation';
import useTournamentStatus from '@hooks/useTournamentStatus';
import useSession from '@hooks/useSession';

const PortfoliosPageHead = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  row-gap: 16px;

  @media (${({ theme }) => theme.devices.desktop}) {
    flex-direction: row;
    justify-content: space-between;
    column-gap: 30px;
    margin-bottom: 48px;
  }
`;

const PortfoliosPageBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  
  @media (${({ theme }) => theme.devices.desktop}) {
    width: 80%;
    margin: 0 auto;
  }
`;

const StyledLoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const TournamentPage = () => {
  const { displayId } = useParams<{ displayId: string; }>();

  const currentUser = useSession();

  const {
    data: tournament,
  } = useTournamentQuery(displayId || '');

  const {
    data: tournamentParticipation,
  } = useTournamentParticipationQuery(tournament?.id || '');

  const {
    data: tournamentParticipationRank,
  } = useTournamentParticipationRankQuery(tournament?.id || '');

  const {
    data: tournamentLeaderboard,
  } = useTournamentLeaderboardQuery(tournament?.id || '');

  const {
    mutate: joinTournament,
    status: joinTournamentMutationStatus,
  } = useJoinTournamentMutation();

  const tournamentStatus = useTournamentStatus(tournament ?? null);

  const handleJoinTournamentButtonClick = async () => {
    if (!tournament) {
      return;
    }

    await joinTournament(tournament.id);

    toast(`You have successfully joined the tournament!`);
  };

  const renderParticipationContent = () => {
    if (!tournament || tournamentParticipation === undefined || tournamentParticipationRank === undefined) {
      return null;
    }

    if (tournamentParticipation === null) {
      return (
        <Typography>—</Typography>
      );
    }

    return (
      <>
        <Typography variant="h1">
          {tournamentParticipationRank}
        </Typography>
        <ColoredPoints points={tournamentParticipation.points} />
      </>
    );
  };

  return (
    <PageLayoutWithMenu pageTitle="Tournament" backHref="/tournaments">
      <PortfoliosPageHead>
        <UserBadge />
        <LabeledContent title="Rank">
          {renderParticipationContent()}
        </LabeledContent>
      </PortfoliosPageHead>
      <PortfoliosPageBody>
        {tournament && tournamentLeaderboard && tournamentParticipation !== undefined ? (
          <TournamentLeaderboard
            tournament={tournament}
            hasParticipation={!!tournamentParticipation}
            isTournamentJoiningInProgress={joinTournamentMutationStatus === 'pending'}
            canJoinTournament={tournamentStatus === 'live' && !!currentUser && currentUser.coinsBalance > tournament.entryPrice}
            onJoinTournamentButtonClick={handleJoinTournamentButtonClick}
            rankedParticipants={tournamentLeaderboard.rankedParticipants}
          />
        ) : (
          <StyledLoaderContainer>
            <Loader />
          </StyledLoaderContainer>
        )}
      </PortfoliosPageBody>
    </PageLayoutWithMenu>
  );
};

export default TournamentPage;
