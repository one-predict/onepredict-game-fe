import styled from 'styled-components';
import { Tournament } from '@api/TournamentApi';
import TournamentCard from './TournamentCard';

export interface TournamentsListProps {
  className?: string;
  tournaments: Tournament[];
  onViewTournamentDetailsClick: (tournament: Tournament) => void;
}

const StyledTournamentsListContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  width: 100%;
`;

const TournamentsList = ({
  className,
  tournaments,
  onViewTournamentDetailsClick,
}: TournamentsListProps) => {
  return (
    <StyledTournamentsListContainer className={className}>
      {tournaments.map((tournament) => (
        <TournamentCard
          key={tournament.id}
          tournament={tournament}
          onViewDetailsClick={onViewTournamentDetailsClick}
        />
      ))}
    </StyledTournamentsListContainer>
  );
};

export default TournamentsList;
