import styled from 'styled-components';
import Typography from '@components/Typography';
import TriangleIcon from '@assets/icons/triangle.svg?react';

export interface ColoredPointsProps {
  points: number;
}

const StyledColoredPointsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 4px;
`;

const getColorFromPoints = (points: number) => {
  if (points > 0) {
    return '#10C600';
  }

  if (points === 0) {
    return '#8C8498';
  }

  return '#D60000';
};

const StyledTriangleIcon = styled(TriangleIcon)<{ $points: number; }>`
  width: 16px;
  height: 16px;
  margin-bottom: ${({ $points }) => $points >= 0 ? `4px` : `4px`};
  fill: ${({ $points }) => getColorFromPoints($points)};
  transform: ${({ $points }) => $points >= 0 ? 'none' : 'rotate(180deg)'};
`;

const StyledPointsTypography = styled(Typography)<{
  $points: number;
}>`
  color: ${({ $points }) => getColorFromPoints($points)};
`;

const ColoredPoints = ({ points }: ColoredPointsProps) => {
  return (
    <StyledColoredPointsContainer>
      <StyledTriangleIcon $points={points} />
      <StyledPointsTypography
        $points={points}
        variant="subtitle1"
      >
        {points > 0 ? `+${points}` : points}
      </StyledPointsTypography>
    </StyledColoredPointsContainer>
  )
};

export default ColoredPoints;
