import Typography, { TypographyProps } from '@components/Typography';

export interface DigitalAssetStreakMultiplierProps extends Omit<TypographyProps, 'children' | 'color'> {
  streak: number;
}

const STREAK_MULTIPLIER_THRESHOLD = 3;
const INITIAL_STREAK_MULTIPLIER = 2;
const MAX_STREAK_MULTIPLIER = 10;

const getMultiplierByStreak = (streak: number) => {
  if (streak < STREAK_MULTIPLIER_THRESHOLD) {
    return 1;
  }

  const multiplier = streak - STREAK_MULTIPLIER_THRESHOLD + INITIAL_STREAK_MULTIPLIER;

  return Math.max(multiplier, MAX_STREAK_MULTIPLIER);
};

const DigitalAssetStreakMultiplier = ({ streak, ...restProps }: DigitalAssetStreakMultiplierProps) => {
  const multiplier = getMultiplierByStreak(streak);

  return (
    <Typography {...restProps} color="gradient1">
      x{multiplier}
    </Typography>
  );
};

export default DigitalAssetStreakMultiplier;
