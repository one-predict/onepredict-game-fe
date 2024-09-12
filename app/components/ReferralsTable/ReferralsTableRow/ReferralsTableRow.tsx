import { TableBodyCell, TableRow } from '@components/Table';
import { Referral } from '@api/ReferralApi';
import styles from './ReferralsTableRow.module.scss';
import UserAvatar from '@components/UserAvatar';

export interface TournamentParticipantRowProps {
  rowCellWidthConfig: number[];
  referral: Referral;
}

const ReferralsTableRow = ({ rowCellWidthConfig, referral }: TournamentParticipantRowProps) => {
  return (
    <TableRow cellWidthConfig={rowCellWidthConfig}>
      <TableBodyCell
        beforeOverflowedContent={
          <UserAvatar className={styles.userAvatar} imageUrl={referral.imageUrl} username={referral.username || ''} />
        }
        overflowed
      >
        {referral.firstName + ' ' + referral.lastName}
      </TableBodyCell>
      <TableBodyCell overflowed>{referral.coinsBalance}</TableBodyCell>
    </TableRow>
  );
};

export default ReferralsTableRow;
