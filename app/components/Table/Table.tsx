import { ReactNode, useMemo } from 'react';
import clsx from 'clsx';
import TableHead from './TableHead';
import TableHeadCell from './TableHeadCell';
import TableBody from './TableBody';
import styles from './Table.module.scss';

export interface TableHeadCellConfig {
  title: string;
  width: number;
}

export interface TableProps<Item> {
  className?: string;
  cells: Array<TableHeadCellConfig>;
  items: Array<Item | null>;
  renderRow: (item: Item, rowCellWidthConfig: number[], index: number) => ReactNode;
}

const Table = <Item,>({ className, items, cells, renderRow }: TableProps<Item>) => {
  const rowCellWidthConfig = useMemo(() => {
    return cells.map((cell) => cell.width);
  }, [cells]);

  return (
    <div className={clsx(styles.table, className)}>
      <TableHead rowCellWidthConfig={rowCellWidthConfig}>
        {cells.map((cell) => (
          <TableHeadCell key={cell.title} width={cell.width}>
            {cell.title}
          </TableHeadCell>
        ))}
      </TableHead>
      <TableBody<Item> rowCellWidthConfig={rowCellWidthConfig} items={items} renderRow={renderRow} />
    </div>
  );
};

export default Table;
