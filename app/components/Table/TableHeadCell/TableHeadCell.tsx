import clsx from 'clsx';
import styles from './TableHeadCell.module.scss';

interface TableHeadCellProps {
  width?: number;
  className?: string;
  children: string;
}

const TableHeadCell = ({ children, width = 100, className }: TableHeadCellProps) => {
  return (
    <div style={{ width: `${width}%` }} className={clsx(styles.tableHeadCell, className)}>
      {children}
    </div>
  );
};

export default TableHeadCell;
