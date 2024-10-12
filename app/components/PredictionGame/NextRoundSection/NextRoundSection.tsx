import { useCallback, useEffect, useMemo, useState } from 'react';
import _ from 'lodash';
import { PredictionStreak } from '@api/PredictionStreakApi';
import { PredictionChoice } from '@api/PredictionChoiceApi';
import { DigitalAssetsPricesSnapshot } from '@api/DigitalAssetsPricesSnapshotApi';
import DigitalAssetPricePrediction from '@types/DigitalAssetPricePrediction';
import DigitalAssetId from '@enums/DigitalAssetId';
import DigitalAssetPriceDirection from '@enums/DigitalAssetPriceDirection';
import PredictionGameSection from '@components/PredictionGame/PredictionGameSection';
import Typography from '@components/Typography';
import TimeRemaining from '@components/TimeRemaining';
import DigitalAssetsPricePredictionCard from '@components/DigitalAssetsPricePredictionCard';
import DigitalAssetStreakMultiplier from '@components/PredictionGame/DigitalAssetStreakMultiplier';
import Button from '@components/Button';
import { getPriceDirectionsFromChoice } from './utils';
import styles from './NextRoundSection.module.scss';
import DigitalAssetPricePredictionView from '@components/DigitalAssetPricePredictionView';

export interface NextRoundSectionProps {
  predictionStreak: PredictionStreak | null;
  nextRoundsAssets: DigitalAssetId[];
  nextRoundStartTimestamp: number;
  nextRoundChoice: PredictionChoice | null;
  onSaveChanges: (predictions: DigitalAssetPricePrediction[]) => void;
  isSaveChangesInProgress?: boolean;
  pricesSnapshots?: DigitalAssetsPricesSnapshot[];
}

const TIME_REMAINING_UPDATE_INTERVAL = 1000;

const NextRoundSection = ({
  predictionStreak,
  nextRoundsAssets,
  nextRoundChoice,
  nextRoundStartTimestamp,
  onSaveChanges,
  isSaveChangesInProgress,
  pricesSnapshots,
}: NextRoundSectionProps) => {
  const derivedPriceDirections: Record<string, DigitalAssetPriceDirection> = useMemo(() => {
    return nextRoundChoice ? getPriceDirectionsFromChoice(nextRoundChoice) : {};
  }, [nextRoundChoice]);

  const [priceDirections, setPriceDirections] = useState(derivedPriceDirections);

  useEffect(() => {
    setPriceDirections(derivedPriceDirections);
  }, [derivedPriceDirections]);

  const handleAssetPriceDirectionSelect = useCallback(
    (assetId: DigitalAssetId, priceDirection: DigitalAssetPriceDirection) => {
      setPriceDirections((previousPriceDirections) => ({
        ...previousPriceDirections,
        [assetId]: priceDirection,
      }));
    },
    [setPriceDirections],
  );

  const handleSaveChangesButtonClick = useCallback(() => {
    onSaveChanges(
      nextRoundsAssets.map((assetId) => ({
        assetId,
        priceDirection: priceDirections[assetId],
      })),
    );
  }, [onSaveChanges, priceDirections, nextRoundsAssets]);

  const allPriceDirectionsSelected = useMemo(() => {
    return Object.keys(priceDirections).length === nextRoundsAssets.length;
  }, [priceDirections, nextRoundsAssets]);

  const isPriceDirectionsChanged = useMemo(() => {
    return !_.isEqual(priceDirections, derivedPriceDirections);
  }, [priceDirections, derivedPriceDirections]);

  return (
    <PredictionGameSection innerContainerClassName={styles.sectionInnerContainer}>
      <div className={styles.nextRoundSectionHeader}>
        <Typography variant="h4">Next Round</Typography>
        <TimeRemaining updateInterval={TIME_REMAINING_UPDATE_INTERVAL} unixTimestamp={nextRoundStartTimestamp}>
          {({ displayRemainingMinutes, displayRemainingSeconds }) => {
            return (
              <Typography color="yellow" tag="span" variant="subtitle2">
                Live In {displayRemainingMinutes}m and {displayRemainingSeconds}s
              </Typography>
            );
          }}
        </TimeRemaining>
      </div>
      {nextRoundChoice ? (
        <div>
          <div className={styles.myChoice}>
            {nextRoundChoice.predictions.map((prediction) => (
              <DigitalAssetPricePredictionView key={prediction.assetId} prediction={prediction} />
            ))}
          </div>
        </div>
      ) : (
        <>
          <DigitalAssetsPricePredictionCard
            className={styles.digitalAssetsPricePredictionCard}
            availableAssets={nextRoundsAssets}
            selectedAssets={nextRoundsAssets}
            priceDirections={priceDirections}
            pricesSnapshots={pricesSnapshots}
            onAssetPriceDirectionSelect={handleAssetPriceDirectionSelect}
            pricingSwitchClassName={styles.pricingSwitch}
          />
          <div className={styles.streaksInfoContainer}>
            {nextRoundsAssets.map((assetId) => (
              <DigitalAssetStreakMultiplier
                key={assetId}
                alignment="center"
                variant="h6"
                streak={predictionStreak?.assetStreaks[assetId] || 0}
              />
            ))}
          </div>
          {allPriceDirectionsSelected && isPriceDirectionsChanged && (
            <Button
              className={styles.submitButton}
              loading={isSaveChangesInProgress}
              onClick={handleSaveChangesButtonClick}
              size="large"
            >
              Submit
            </Button>
          )}
        </>
      )}
    </PredictionGameSection>
  );
};

export default NextRoundSection;
