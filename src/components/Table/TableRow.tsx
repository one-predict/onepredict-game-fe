import { ReactNode } from 'react';
import styled from 'styled-components';

export interface TableRowProps {
  children: ReactNode;
  cellWidthConfig: number[];
}

const StyledTableBodyRow = styled.div<{ $cellWidthConfig: number[]; }>`
  display: grid;
  grid-template-columns: ${({ $cellWidthConfig }) => $cellWidthConfig.map((width) => `${width}%`).join(' ')};
  border-bottom: 1px solid #6DA2CE;
  padding: 16px 
`;

const TableRow = ({ cellWidthConfig, children }: TableRowProps) => {
  return (
    <StyledTableBodyRow $cellWidthConfig={cellWidthConfig}>
      {children}
    </StyledTableBodyRow>
  );
};

export default TableRow;
