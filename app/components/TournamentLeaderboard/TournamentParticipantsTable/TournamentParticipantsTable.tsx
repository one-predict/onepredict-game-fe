import Table from '@components/Table';
import { TournamentParticipant } from '@api/TournamentApi';
import TournamentParticipantRow from './TournamentParticipantRow';

export interface TournamentParticipantsTableProps {
  className?: string;
  rankedParticipants: Array<TournamentParticipant>;
}

const TOURNAMENTS_TABLE_CELLS = [
  {
    title: 'Username',
    width: 40,
  },
  {
    title: 'Points',
    width: 35,
  },
  {
    title: 'Rank',
    width: 25,
  },
];

const TournamentParticipantsTable = ({ className, rankedParticipants }: TournamentParticipantsTableProps) => {
  const renderRow = (participant: TournamentParticipant, rowCellWidthConfig: number[], index: number) => {
    return (
      <TournamentParticipantRow
        key={participant.id}
        rowCellWidthConfig={rowCellWidthConfig}
        participant={participant}
        index={index}
      />
    );
  };

  return (
    <Table<TournamentParticipant>
      className={className}
      cells={TOURNAMENTS_TABLE_CELLS}
      items={rankedParticipants}
      renderRow={renderRow}
    />
  );
};

export default TournamentParticipantsTable;
