import { ReactNode } from 'react';
import styled from 'styled-components';

interface TableBodyProps<Item> {
  className?: string;
  items: Array<Item | null>;
  renderRow: (item: Item, rowCellWidthConfig: number[], index: number) => ReactNode;
  rowCellWidthConfig: number[];
}

const StyledTableBodyContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const TableBody = <Items,>({ rowCellWidthConfig, renderRow, className, items }: TableBodyProps<Items>) => {
  return (
    <StyledTableBodyContainer className={className}>
      {items.map((item, index) => {
        if (!item) {
          return null;
        }

        return renderRow(item, rowCellWidthConfig, index);
      })}
    </StyledTableBodyContainer>
  );
};

export default TableBody;
