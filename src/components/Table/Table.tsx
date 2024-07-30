import { ReactNode, useMemo } from 'react';
import styled from 'styled-components';
import TableHead from './TableHead';
import TableHeadCell from './TableHeadCell';
import TableBody from './TableBody';

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

const StyledTableContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Table = <Item,>({
  className,
  items,
  cells,
  renderRow,
}: TableProps<Item>) => {
  const rowCellWidthConfig = useMemo(() => {
    return cells.map((cell) => cell.width);
  }, [cells]);

  return (
    <StyledTableContainer className={className}>
      <TableHead rowCellWidthConfig={rowCellWidthConfig}>
        {cells.map((cell) => (
          <TableHeadCell key={cell.title} width={cell.width}>{cell.title}</TableHeadCell>
        ))}
      </TableHead>
      <TableBody<Item>
        rowCellWidthConfig={rowCellWidthConfig}
        items={items}
        renderRow={renderRow}
      />
    </StyledTableContainer>
  );
};

export default Table;
