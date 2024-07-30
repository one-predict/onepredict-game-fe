import styled from 'styled-components';

interface TableHeadCellProps {
  width?: number;
  className?: string;
  children: string;
}

const StyledTableHeadCellContainer = styled.div<{ $width: number }>`
  width: ${({ $width }) => `${$width}%`};
  color: #439CB5;
`;

const TableHeadCell = ({
  children,
  width = 100,
  className,
}: TableHeadCellProps) => {
  return (
    <StyledTableHeadCellContainer className={className} $width={width}>
      {children}
    </StyledTableHeadCellContainer>
  );
};

export default TableHeadCell;
