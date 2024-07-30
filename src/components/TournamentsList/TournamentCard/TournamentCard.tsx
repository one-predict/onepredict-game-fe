import styled from 'styled-components';
import { Tournament } from '@api/TournamentApi';
import Button from '@components/Button';
import Typography, { GradientTypography } from '@components/Typography';
import TournamentAvailabilityInfo from '@components/TournamentAvailabilityInfo';

import aipickCoinSrc from "@assets/aipick-coin.png";

export interface TournamentCardProps {
  tournament: Tournament;
  onViewDetailsClick: (tournament: Tournament) => void;
}

const StyledTournamentCard = styled.div`
  position: relative;
  width: 100%;
  padding: 46px 16px 16px;
  border: 1px solid #8C8498;
  background-color: #08042D;
  border-radius: 12px;
`;

const StyledTournamentAvailabilityInfo = styled(TournamentAvailabilityInfo)`
  position: absolute;
  top: 16px;
  left: 16px;
  right: 16px;
`;

const StyledPrizePoolTypography = styled(Typography)`
  margin: 28px 0 21px;
  color: #10C600;
`;

const StyledAipickCoinImage = styled.img`
  position: absolute;
  top: 70px;
  right: 32px;
`;

const StyledAipickCoinImageShadow = styled.div`
  position: absolute;
  top: 80px;
  right: 42px;
  width: 72px;
  height: 72px;
  background: rgba(0, 0, 0, 0.25);
  border-radius: 50%;
  box-shadow: 0 0 100px 40px #3a1f66;
`;

const StyledViewDetailsButton = styled(Button)`
  width: 50%;
  height: 33px;
  min-height: 33px;
  
  @media (${({ theme }) => theme.devices.desktop}) {
    width: 50%;
  }
`;

const TournamentCard = ({ tournament, onViewDetailsClick }: TournamentCardProps) => {
  const prizePool = (tournament.entryPrice * tournament.participantsCount) + tournament.staticPrizePool;

  return (
    <StyledTournamentCard>
      <StyledTournamentAvailabilityInfo tournament={tournament} />
      <GradientTypography variant="h1" gradientVariant="secondary">Weekly</GradientTypography>
      <StyledPrizePoolTypography variant="h6">Prize Pool {prizePool} AIP</StyledPrizePoolTypography>
      <StyledAipickCoinImage src={aipickCoinSrc} alt="aipick-coin" />
      <StyledAipickCoinImageShadow />
      <StyledViewDetailsButton onClick={() => onViewDetailsClick(tournament)}>
        View Details
      </StyledViewDetailsButton>
    </StyledTournamentCard>
  );
};

export default TournamentCard;
