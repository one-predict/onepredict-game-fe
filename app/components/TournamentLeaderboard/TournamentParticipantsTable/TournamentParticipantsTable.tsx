import Table from '@components/Table';
import { TournamentParticipant } from '@api/TournamentApi';
import TournamentParticipantRow from './TournamentParticipantRow';

export interface TournamentParticipantsTableProps {
  className?: string;
  startsFrom?: number;
  rankedParticipants: Array<TournamentParticipant>;
}

const TOURNAMENTS_TABLE_CELLS = [
  {
    title: 'Rank',
    width: 20,
  },
  {
    title: 'Username',
    width: 60,
  },
  {
    title: 'Points',
    width: 20,
  },
];

const TournamentParticipantsTable = ({
  startsFrom = 0,
  className,
  rankedParticipants,
}: TournamentParticipantsTableProps) => {
  const renderRow = (participant: TournamentParticipant, rowCellWidthConfig: number[], index: number) => {
    return (
      <TournamentParticipantRow
        key={participant.id}
        rowCellWidthConfig={rowCellWidthConfig}
        participant={participant}
        index={index + startsFrom}
      />
    );
  };

  return (
    <Table<TournamentParticipant>
      className={className}
      cells={TOURNAMENTS_TABLE_CELLS}
      items={rankedParticipants}
      renderRow={renderRow}
      withoutTableHead={true}
    />
  );
};

export default TournamentParticipantsTable;
