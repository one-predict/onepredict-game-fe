import AutoHeightSparkline from '@components/AutoHeightSparkline';
import styles from './DigitalAssetPriceSparkline.module.scss';

export interface DigitalAssetPriceSparklineProps {
  positive: boolean;
  data: number[];
}

const DigitalAssetPriceSparkline = ({ positive, data }: DigitalAssetPriceSparklineProps) => {
  return (
    <AutoHeightSparkline
      stroke={positive ? styles.positiveStroke : styles.negativeStroke}
      fill={positive ? styles.positiveFill : styles.negativeFill}
      data={data}
      startAtZero={false}
    />
  );
};

export default DigitalAssetPriceSparkline;
