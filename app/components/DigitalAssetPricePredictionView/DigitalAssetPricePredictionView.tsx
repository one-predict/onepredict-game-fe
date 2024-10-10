import _ from 'lodash';
import clsx from 'clsx';
import DigitalAssetPricePrediction from '@types/DigitalAssetPricePrediction';
import DigitalAssetPriceDirection from '@enums/DigitalAssetPriceDirection';
import DigitalAssetImage from '@components/DigitalAssetImage';
import Typography from '@components/Typography';
import ColoredPoints from '@components/ColoredPoints';
import BoldArrowIcon from '@assets/icons/bold-arrow.svg?react';
import styles from './DigitalAssetPricePredictionView.module.scss';

export interface DigitalAssetPricePredictionViewProps {
  priceChange: number | undefined;
  prediction: DigitalAssetPricePrediction;
}

const PRICE_CHANGE_ROUND_PRECISION = 2;

const DigitalAssetPricePredictionView = ({ prediction, priceChange }: DigitalAssetPricePredictionViewProps) => {
  const arrowIconClassName =
    prediction.priceDirection === DigitalAssetPriceDirection.Up ? styles.upArrowIcon : styles.downArrowIcon;

  const isPriceChangeAvailable = priceChange !== undefined;

  const isPricePredictionCorrect =
    prediction.priceDirection === DigitalAssetPriceDirection.Down ? priceChange < 0 : priceChange > 0;

  const pricePredictionViewContainerComposedClassName = clsx(styles.pricePredictionView, {
    [styles.correctResultPricePredictionView]: isPriceChangeAvailable && isPricePredictionCorrect,
    [styles.wrongResultPricePredictionView]: isPriceChangeAvailable && !isPricePredictionCorrect,
  });

  return (
    <div className={pricePredictionViewContainerComposedClassName}>
      <div className={styles.pricePredictionIconContainer}>
        <BoldArrowIcon className={arrowIconClassName} />
      </div>
      <DigitalAssetImage className={styles.assetImage} assetId={prediction.assetId} />
      <Typography className={styles.assetName} uppercase variant="subtitle2" color="primary">
        {prediction.assetId}
      </Typography>
      {priceChange ? (
        <ColoredPoints
          variant="subtitle2"
          postfix="%"
          hideTriangle
          points={_.round(priceChange, PRICE_CHANGE_ROUND_PRECISION)}
        />
      ) : (
        <Typography color="gray" variant="subtitle2">
          No Data
        </Typography>
      )}
    </div>
  );
};

export default DigitalAssetPricePredictionView;
