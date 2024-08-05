import { ReactNode } from 'react';
import clsx from 'clsx';
import styles from './TableHead.module.scss';

export interface TableHeadProps {
  rowCellWidthConfig: number[];
  children: ReactNode;
  className?: string;
}

const TableHead = ({ className, children, rowCellWidthConfig }: TableHeadProps) => {
  return (
    <div
      style={{ gridTemplateColumns: rowCellWidthConfig.map((width) => `${width}%`).join(' ') }}
      className={clsx(styles.tableHead, className)}
    >
      {children}
    </div>
  );
};

export default TableHead;
