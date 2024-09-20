import { TournamentParticipant } from '@api/TournamentApi';
import { TableBodyCell, TableRow } from '@components/Table';
import styles from './TournamentParticipantRow.module.scss';
import UserAvatar from '@components/UserAvatar';
import CupIcon from '@assets/icons/cup2.svg?react';
import ColoredPoints from '@app/components/ColoredPoints';

export interface TournamentParticipantRowProps {
  rowCellWidthConfig: number[];
  participant: TournamentParticipant;
  index: number;
}

const TournamentParticipantRow = ({ rowCellWidthConfig, participant, index }: TournamentParticipantRowProps) => {
  return (
    <TableRow cellWidthConfig={rowCellWidthConfig}>
      <TableBodyCell
        className={styles.prizePlace}
        beforeOverflowedContent={
          <CupIcon className={styles.cupIcon} />
        }
        overflowed
      >
        {index + 1}
      </TableBodyCell>
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
        <ColoredPoints points={participant.points}></ColoredPoints>
      </TableBodyCell>
      <TableBodyCell
        className={styles.pointsText}
        beforeOverflowedContent={
          <img src={"/images/token.png"} className={styles.pointsImg}></img>
        }
        overflowed
      >
        {
          // TODO add rewards
        }
        0
      </TableBodyCell>
    </TableRow>
  );
};

export default TournamentParticipantRow;
