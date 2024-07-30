import styled from 'styled-components';
import { Tournament } from '@api/TournamentApi';
import Typography, { GradientTypography } from '@components/Typography';
import TournamentParticipantsTable from '@components/TournamentLeaderboard/TournamentParticipantsTable';
import LabeledContent from '@components/LabeledContent';
import TournamentAvailabilityInfo from '@components/TournamentAvailabilityInfo';
import Button from '@components/Button';

export interface TournamentLeaderboardProps {
  tournament: Tournament;
  hasParticipation: boolean;
  canJoinTournament: boolean;
  onJoinTournamentButtonClick: () => void;
  rankedParticipants: Array<{
    id: string;
    username: string;
    imageUrl: string;
    points: number;
  }>;
  isTournamentJoiningInProgress?: boolean;
}

const StyledTournamentLeaderboardContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: #08042D;
  border: 1px solid #8C8498;
  width: 100%;
  border-radius: 12px;
  padding: 54px 10px 16px;
`;

const StyledTournamentAvailabilityInfo = styled(TournamentAvailabilityInfo)`
  position: absolute;
  top: 16px;
  left: 16px;
  right: 16px;
`;

const StyledTournamentLeaderboardSubHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin: 16px 0 32px;
`;

const StyledJoinTournamentButton = styled(Button)`
  width: 200px;
  height: 33px;
  min-height: 33px;
`;

const StyledParticipationInfo = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  margin-top: 24px;

  @media (${({ theme }) => theme.devices.desktop}) {
    flex-direction: row;
    align-items: center;
    column-gap: 16px;
  }
`;

const TournamentLeaderboard = ({
  tournament,
  canJoinTournament,
  onJoinTournamentButtonClick,
  rankedParticipants,
  hasParticipation,
  isTournamentJoiningInProgress,
}: TournamentLeaderboardProps) => {
  return (
    <StyledTournamentLeaderboardContainer>
      <StyledTournamentAvailabilityInfo tournament={tournament} />
      <GradientTypography gradientVariant="secondary" variant="h1">Leaderboard</GradientTypography>
      {!hasParticipation && <StyledParticipationInfo>
        <Typography variant="h4" >You're not a participant of tournament:</Typography>
        <StyledJoinTournamentButton
          disabled={!canJoinTournament}
          onClick={onJoinTournamentButtonClick}
          loading={isTournamentJoiningInProgress}
        >
          Join for {tournament.entryPrice} AIP
        </StyledJoinTournamentButton>
      </StyledParticipationInfo>}
      <StyledTournamentLeaderboardSubHeader>
        <LabeledContent title="Prize Pool">
          <Typography variant="h3">
            {(tournament.participantsCount * tournament.entryPrice) + tournament.staticPrizePool} AIP
          </Typography>
        </LabeledContent>
        <LabeledContent title="Count of Players">
          <Typography alignment="right" variant="h3">{tournament.participantsCount}</Typography>
        </LabeledContent>
      </StyledTournamentLeaderboardSubHeader>
      {rankedParticipants.length ? (
        <TournamentParticipantsTable rankedParticipants={rankedParticipants} />
      ) : (
        <Typography alignment="center" variant="h4">No participants yet!</Typography>
      )}
    </StyledTournamentLeaderboardContainer>
  )
};

export default TournamentLeaderboard;
