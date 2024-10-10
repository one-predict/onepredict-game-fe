import _ from 'lodash';
import clsx from 'clsx';
import DigitalAssetImage from '@components/DigitalAssetImage';
import Typography from '@components/Typography';
import ColoredPoints from '@components/ColoredPoints';
import DigitalAssetPriceSparkline from '@components/DigitalAssetPriceSparkline';
import styles from './DigitalAssetSparklineView.module.scss';

export interface DigitalAssetSparklineViewProps {
  className?: string;
  imageClassName?: string;
  assetId: string;
  percentagePriceChange: number;
  points: number[];
}

const PERCENTAGE_ROUND = 2;

const DigitalAssetSparklineView = ({
  className,
  imageClassName,
  assetId,
  percentagePriceChange,
  points,
}: DigitalAssetSparklineViewProps) => {
  return (
    <div className={className}>
      <DigitalAssetImage className={clsx(styles.assetImage, imageClassName)} assetId={assetId} />
      <Typography uppercase variant="subtitle2" color="primary">
        {assetId}
      </Typography>
      <ColoredPoints
        variant="subtitle2"
        postfix="%"
        hideTriangle
        points={_.round(percentagePriceChange, PERCENTAGE_ROUND)}
      />
      <div className={styles.sparklinesContainer}>
        <DigitalAssetPriceSparkline positive={percentagePriceChange >= 0} data={points} />
      </div>
    </div>
  );
};

export default DigitalAssetSparklineView;
