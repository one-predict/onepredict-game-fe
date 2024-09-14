import AutoHeightSparkline from '@components/AutoHeightSparkline';
import styles from './TokenPointsSparkline.module.scss';

export interface TokenPointsSparklineProps {
  positive: boolean;
  data: number[];
}

const TokenPointsSparkline = ({ positive, data }: TokenPointsSparklineProps) => {
  return (
    <AutoHeightSparkline
      stroke={positive ? styles.positiveStroke : styles.negativeStroke}
      fill={positive ? styles.positiveFill : styles.negativeFill}
      data={data}
      startAtZero={false}
    />
  );
};

export default TokenPointsSparkline;
