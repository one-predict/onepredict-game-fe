import { ReactNode } from 'react';
import clsx from 'clsx';
import styles from './TableBodyCell.module.scss';

export interface TableBodyCellProps {
  className?: string;
  overflowed?: boolean;
  beforeOverflowedContent?: ReactNode;
  children: ReactNode;
}

const TableBodyCell = ({ children, className, overflowed = false, beforeOverflowedContent }: TableBodyCellProps) => {
  const getTableBodyCellContent = () => {
    if (typeof children === 'number') {
      return children;
    }

    return children || <>—</>;
  };

  const tableBodyCellContent = getTableBodyCellContent();

  return (
    <div className={clsx(styles.tableBodyCell, className)}>
      {beforeOverflowedContent}
      {overflowed && <div className={styles.overflowedTableBodyCellContainer}>{tableBodyCellContent}</div>}
      {!overflowed && tableBodyCellContent}
    </div>
  );
};

export default TableBodyCell;
