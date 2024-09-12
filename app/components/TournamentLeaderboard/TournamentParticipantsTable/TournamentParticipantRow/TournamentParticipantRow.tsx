import { TournamentParticipant } from '@api/TournamentApi';
import { TableBodyCell, TableRow } from '@components/Table';
import styles from './TournamentParticipantRow.module.scss';
import UserAvatar from '@components/UserAvatar';

export interface TournamentParticipantRowProps {
  rowCellWidthConfig: number[];
  participant: TournamentParticipant;
  index: number;
}

const TournamentParticipantRow = ({ rowCellWidthConfig, participant, index }: TournamentParticipantRowProps) => {
  return (
    <TableRow cellWidthConfig={rowCellWidthConfig}>
      <TableBodyCell
        beforeOverflowedContent={
          <UserAvatar
            className={styles.participantAvatar}
            imageUrl={participant.imageUrl}
            username={participant.username}
          />
        }
        overflowed
      >
        {participant.username}
      </TableBodyCell>
      <TableBodyCell overflowed>{participant.points}</TableBodyCell>
      <TableBodyCell overflowed>{index + 1}</TableBodyCell>
    </TableRow>
  );
};

export default TournamentParticipantRow;
