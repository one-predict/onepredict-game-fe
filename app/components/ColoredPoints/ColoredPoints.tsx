import clsx from 'clsx';
import Typography from '@components/Typography';
import TriangleIcon from '@assets/icons/triangle.svg?react';
import styles from './ColoredPoints.module.scss';

export interface ColoredPointsProps {
  points: number;
}

const ColoredPoints = ({ points }: ColoredPointsProps) => {
  const coloredPointsContainerClassname = clsx({
    [styles.positiveColoredPointsContainer]: points > 0,
    [styles.negativeColoredPointsContainer]: points < 0,
    [styles.neutralColoredPointsContainer]: points === 0,
  });

  return (
    <div className={coloredPointsContainerClassname}>
      <TriangleIcon className={styles.triangleIcon} />
      <Typography className={styles.pointsTypography} variant="subtitle1">
        {points > 0 ? `+${points}` : points}
      </Typography>
    </div>
  );
};

export default ColoredPoints;
