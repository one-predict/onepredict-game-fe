import clsx from 'clsx';
import Typography, { TypographyProps } from '@components/Typography';
import TriangleIcon from '@assets/icons/triangle.svg?react';
import styles from './ColoredPoints.module.scss';

export interface ColoredPointsProps extends Omit<TypographyProps, 'children'> {
  points: number;
  hideTriangle?: boolean;
  postfix?: string;
}

const ColoredPoints = ({
  className,
  points,
  hideTriangle,
  variant = 'subtitle1',
  postfix,
  ...restProps
}: ColoredPointsProps) => {
  const coloredPointsContainerClassname = clsx({
    [styles.positiveColoredPointsContainer]: points > 0,
    [styles.negativeColoredPointsContainer]: points < 0,
    [styles.neutralColoredPointsContainer]: points === 0,
  });

  return (
    <div className={coloredPointsContainerClassname}>
      {!hideTriangle && <TriangleIcon className={styles.triangleIcon} />}
      <Typography {...restProps} className={clsx(styles.pointsTypography, className)} variant={variant}>
        {points > 0 ? `+${points}` : points}
        {postfix}
      </Typography>
    </div>
  );
};

export default ColoredPoints;
