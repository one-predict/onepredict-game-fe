import { ReactNode } from 'react';
import styled from 'styled-components';
import { overflowedMixin } from '@app/mixins';

export interface TableBodyCellProps {
  className?: string;
  overflowed?: boolean;
  beforeOverflowedContent?: ReactNode;
  children: ReactNode;
}

const StyledTableBodyCellContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  line-height: 20.06px;
  padding-right: 20px;
  color: #FFFFFF;
`;

const StyledOverflowedContainer = styled.div`
  ${overflowedMixin}
`;

const TableBodyCell = ({
  children,
  className,
  overflowed = false,
  beforeOverflowedContent,
}: TableBodyCellProps) => {
  const getTableBodyCellContent = () => {
    if (typeof children === 'number') {
      return children;
    }

    return children || <>—</>;
  };

  const tableBodyCellContent = getTableBodyCellContent();

  return (
    <StyledTableBodyCellContainer className={className}>
      {beforeOverflowedContent}
      {overflowed && (
        <StyledOverflowedContainer>
          {tableBodyCellContent}
        </StyledOverflowedContainer>
      )}
      {!overflowed && tableBodyCellContent}
    </StyledTableBodyCellContainer>
  );
};

export default TableBodyCell;
