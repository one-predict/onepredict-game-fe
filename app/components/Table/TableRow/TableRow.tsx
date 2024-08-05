import { ReactNode } from 'react';
import styles from './TableRow.module.scss';

export interface TableRowProps {
  children: ReactNode;
  cellWidthConfig: number[];
}

const TableRow = ({ cellWidthConfig, children }: TableRowProps) => {
  return (
    <div
      className={styles.tableRow}
      style={{ gridTemplateColumns: cellWidthConfig.map((width) => `${width}%`).join(' ') }}
    >
      {children}
    </div>
  );
};

export default TableRow;
