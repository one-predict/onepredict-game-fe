import { ReactNode } from 'react';
import clsx from 'clsx';
import styles from './TableBody.module.scss';

interface TableBodyProps<Item> {
  className?: string;
  items: Array<Item | null>;
  renderRow: (item: Item, rowCellWidthConfig: number[], index: number) => ReactNode;
  rowCellWidthConfig: number[];
}

const TableBody = <Items,>({ rowCellWidthConfig, renderRow, className, items }: TableBodyProps<Items>) => {
  return (
    <div className={clsx(styles.tableBody, className)}>
      {items.map((item, index) => {
        if (!item) {
          return null;
        }

        return renderRow(item, rowCellWidthConfig, index);
      })}
    </div>
  );
};

export default TableBody;
