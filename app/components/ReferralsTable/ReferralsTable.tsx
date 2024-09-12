import { Referral } from '@api/ReferralApi';
import Table from '@components/Table';
import ReferralsTableRow from './ReferralsTableRow';

export interface ReferralsTableProps {
  className?: string;
  referrals: Referral[];
}

const REFERRALS_TABLE_CELLS = [
  {
    title: 'Username',
    width: 60,
  },
  {
    title: 'Coins',
    width: 40,
  },
];

const ReferralsTable = ({ className, referrals }: ReferralsTableProps) => {
  const renderRow = (referral: Referral, rowCellWidthConfig: number[]) => (
    <ReferralsTableRow key={referral.id} rowCellWidthConfig={rowCellWidthConfig} referral={referral} />
  );

  return (
    <Table<Referral> className={className} cells={REFERRALS_TABLE_CELLS} items={referrals} renderRow={renderRow} />
  );
};

export default ReferralsTable;
