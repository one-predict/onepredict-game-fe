import { useMemo, useState } from 'react';
import _ from 'lodash';
import clsx from 'clsx';
import { DigitalAssetsPricesSnapshot } from '@api/DigitalAssetsPricesSnapshotApi';
import DigitalAssetId from '@enums/DigitalAssetId';
import DigitalAssetPriceDirection from '@enums/DigitalAssetPriceDirection';
import useAssetsSparklinePoints from '@hooks/useAssetsSparklinePoints';
import ArrowsSwitch from '@components/ArrowsSwitch';
import DigitalAssetSparklineView from '@components/DigitalAssetSparklineView';
import DigitalAssetImage from '@components/DigitalAssetImage';
import BoldArrowIcon from '@assets/icons/bold-arrow.svg?react';
import styles from './DigitalAssetsPricePredictionCard.module.scss';

export interface DigitalAssetsPricePredictionCardProps {
  className?: string;
  availableAssets: DigitalAssetId[];
  selectedAssets: DigitalAssetId[];
  priceDirections: Record<string, DigitalAssetPriceDirection>;
  onAssetClick?: (assetId: DigitalAssetId) => void;
  onAssetPriceDirectionSelect?: (assetId: DigitalAssetId, priceDirection: DigitalAssetPriceDirection) => void;
  pricesSnapshots?: DigitalAssetsPricesSnapshot[];
  pricingSwitchClassName?: string;
}

const DigitalAssetsPricePredictionCard = ({
  availableAssets,
  selectedAssets,
  priceDirections,
  onAssetClick,
  className,
  onAssetPriceDirectionSelect,
  pricesSnapshots,
  pricingSwitchClassName,
}: DigitalAssetsPricePredictionCardProps) => {
  const [showPricingInfo, setShowPricingInfo] = useState(false);

  const selectedAssetsMap = useMemo(() => {
    return _.keyBy(selectedAssets);
  }, [selectedAssets]);

  const sparklinePointsByAssetId = useAssetsSparklinePoints(pricesSnapshots);

  const renderPriceDirectionButton = (
    assetId: DigitalAssetId,
    targetPriceDirection: DigitalAssetPriceDirection,
    currentPriceDirection: DigitalAssetPriceDirection,
  ) => {
    const isTargetDirectionSelected = targetPriceDirection === currentPriceDirection;

    return (
      <div
        onClick={() => onAssetPriceDirectionSelect?.(assetId, targetPriceDirection)}
        className={clsx({
          [styles.growthButton]: targetPriceDirection === DigitalAssetPriceDirection.Up,
          [styles.fallButton]: targetPriceDirection === DigitalAssetPriceDirection.Down,
          [styles.selectedGrowthButton]:
            targetPriceDirection === DigitalAssetPriceDirection.Up && isTargetDirectionSelected,
          [styles.selectedFallButton]:
            targetPriceDirection === DigitalAssetPriceDirection.Down && isTargetDirectionSelected,
          [styles.nonSelectedDirectionButton]: !isTargetDirectionSelected && !onAssetPriceDirectionSelect,
        })}
      >
        <div className={styles.directionButtonContent}>
          <BoldArrowIcon className={styles.arrow} />
          {targetPriceDirection === DigitalAssetPriceDirection.Up ? 'Moon' : 'Doom'}
        </div>
      </div>
    );
  };

  const renderAssetFront = (assetId: DigitalAssetId) => {
    const isAssetSelected = selectedAssetsMap[assetId];
    const priceDirection = priceDirections[assetId];

    return (
      <div key={assetId} className={clsx(styles.assetFront, isAssetSelected && styles.selectedAssetFront)}>
        {isAssetSelected && renderPriceDirectionButton(assetId, DigitalAssetPriceDirection.Up, priceDirection)}
        <div onClick={() => onAssetClick?.(assetId)} className={styles.assetInformation}>
          <DigitalAssetImage className={styles.assetFrontImage} assetId={assetId} />
          {assetId}
        </div>
        {isAssetSelected && renderPriceDirectionButton(assetId, DigitalAssetPriceDirection.Down, priceDirection)}
      </div>
    );
  };

  const renderAssetBack = (assetId: string) => {
    if (!sparklinePointsByAssetId || !pricesSnapshots?.length) {
      return null;
    }

    const periodOpenPrice = pricesSnapshots[0].prices[assetId];
    const periodClosePrice = pricesSnapshots[pricesSnapshots.length - 1].prices[assetId];

    const percentageDifference = ((periodClosePrice - periodOpenPrice) / periodOpenPrice) * 100;

    return (
      <DigitalAssetSparklineView
        assetId={assetId}
        className={styles.assetBack}
        imageClassName={styles.assetBackImage}
        points={sparklinePointsByAssetId[assetId]}
        percentagePriceChange={percentageDifference}
      />
    );
  };

  return (
    <div className={clsx(styles.assetPricePredictionCard, className)}>
      {!!pricesSnapshots?.length && (
        <ArrowsSwitch
          checked={showPricingInfo}
          onChange={() => setShowPricingInfo(!showPricingInfo)}
          className={clsx(styles.pricingSwitch, pricingSwitchClassName)}
        />
      )}
      <div className={styles.assetsGrid}>
        {availableAssets.map((assetId) => {
          return (
            <div key={assetId} className={styles.asset}>
              <div className={clsx(styles.assetInnerWrapper, showPricingInfo && styles.flippedAssetInnerWrapper)}>
                {renderAssetFront(assetId)}
                {renderAssetBack(assetId)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DigitalAssetsPricePredictionCard;
