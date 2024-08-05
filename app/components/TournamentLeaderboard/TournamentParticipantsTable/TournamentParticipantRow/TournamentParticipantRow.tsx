import { TournamentParticipant } from '@api/TournamentApi';
import { TableBodyCell, TableRow } from '@components/Table';
import styles from './TournamentParticipantRow.module.scss';

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
          <img
            className={styles.participantAvatar}
            width={24}
            height={24}
            src={participant.imageUrl || '/images/avatar.png'}
            alt={participant.username}
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
