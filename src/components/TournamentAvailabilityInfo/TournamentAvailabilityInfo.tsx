import { useMemo } from 'react';
import { upperFirst } from 'lodash';
import styled from 'styled-components';
import { Tournament } from '@api/TournamentApi';
import DateRangeView from '@components/DateRangeView';
import { getDateFromUtcDay } from '@app/utils/date';
import useTournamentStatus from '@hooks/useTournamentStatus';

type TournamentStatus = 'upcoming' | 'live' | 'finished';

export interface TournamentAvailabilityInfoProps {
  className?: string;
  tournament: Tournament;
}

const StyledTournamentAvailabilityInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledTournamentStatusBadge = styled.div<{
  $tournamentStatus: TournamentStatus;
}>`
  height: 15px;
  background-color: #190A31;
  padding: 0 18.5px;
  color: ${({ $tournamentStatus }) => {
    switch ($tournamentStatus) {
      case 'upcoming':
        return '#FFB800';
      case 'live':
        return '#10C600';
      case 'finished':
        return '#8C8498';
    }
  }};
  border: 1px solid #8C8498;
  border-radius: 12px;
  font-size: 0.625rem;
  line-height: 1rem;
  font-weight: 400;
`;

const TournamentAvailabilityInfo = ({ className, tournament }: TournamentAvailabilityInfoProps) => {
  const tournamentStartDate = useMemo(() => {
    return getDateFromUtcDay(tournament.startDay);
  }, [tournament.startDay]);

  const tournamentEndDate = useMemo(() => {
    return getDateFromUtcDay(tournament.endDay);
  }, [tournament.endDay]);

  const tournamentStatus = useTournamentStatus(tournament);

  if (!tournamentStatus) {
    return null;
  }

  return (
    <StyledTournamentAvailabilityInfoContainer className={className}>
      <StyledTournamentStatusBadge $tournamentStatus={tournamentStatus}>
        {upperFirst(tournamentStatus)}
      </StyledTournamentStatusBadge>
      <DateRangeView fromDate={tournamentStartDate} toDate={tournamentEndDate} />
    </StyledTournamentAvailabilityInfoContainer>
  );
};

export default TournamentAvailabilityInfo;
