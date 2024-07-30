import styled from 'styled-components';
import { TournamentParticipant } from '@api/TournamentApi';
import { TableBodyCell, TableRow } from '@components/Table';

export interface TournamentParticipantRowProps {
  rowCellWidthConfig: number[];
  participant: TournamentParticipant;
  index: number;
}

const StyledTournamentParticipationAvatar = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 8px;
`;

const TournamentParticipantRow = ({ rowCellWidthConfig, participant, index }: TournamentParticipantRowProps) => {
  return (
    <TableRow cellWidthConfig={rowCellWidthConfig}>
      <TableBodyCell
        beforeOverflowedContent={(
          <StyledTournamentParticipationAvatar
            src={participant.imageUrl}
            alt={participant.username}
          />
        )}
        overflowed
      >
        {participant.username}
      </TableBodyCell>
      <TableBodyCell overflowed>
        {participant.points}
      </TableBodyCell>
      <TableBodyCell overflowed>
        {index + 1}
      </TableBodyCell>
    </TableRow>
  );
};

export default TournamentParticipantRow;
