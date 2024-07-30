import { ReactNode } from 'react';
import styled from 'styled-components';

export interface TableHeadProps {
  rowCellWidthConfig: number[];
  children: ReactNode;
  className?: string;
}

const StyledTableHeadContainer = styled.div<{ $rowCellWidthConfig: number[] }>`
  display: grid;
  grid-template-columns: ${({ $rowCellWidthConfig }) => $rowCellWidthConfig.map((width) => `${width}%`).join(' ')};
  border: 1px solid #8C8498;
  border-left-width: 0;
  border-right-width: 0;
  padding: 8px 16px;
`;

const TableHead = ({ className, children, rowCellWidthConfig }: TableHeadProps) => {
  return (
    <StyledTableHeadContainer
      $rowCellWidthConfig={rowCellWidthConfig}
      className={className}
    >
      {children}
    </StyledTableHeadContainer>
  );
};

export default TableHead;
