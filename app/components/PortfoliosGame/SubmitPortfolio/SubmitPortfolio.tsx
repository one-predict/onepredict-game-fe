import { useCallback, useMemo, useState } from 'react';
import { TokensOffer } from '@api/TokensOfferApi';
import DigitalAssetPricePrediction from '@types/DigitalAssetPricePrediction';
import DigitalAssetId from '@enums/DigitalAssetId';
import DigitalAssetPriceDirection from '@enums/DigitalAssetPriceDirection';
import useDigitalAssetsPricesSnapshotsQuery from '@hooks/queries/useDigitalAssetsPricesSnapshotsQuery';
import { SubmitButton } from '@components/Button';
import Typography from '@components/Typography';
import DigitalAssetsPricePredictionCard from '@components/DigitalAssetsPricePredictionCard';
import TimeRemaining from '@components/TimeRemaining';
import styles from './SubmitPortfolio.module.scss';

export interface SubmitPortfolioProps {
  offer: TokensOffer;
  onSubmit: (offerId: string, predictions: DigitalAssetPricePrediction[]) => void;
  isSubmitInProgress?: boolean;
}

const MAX_PREDICTIONS_PER_PORTFOLIO = 6;

const SubmitPortfolio = ({ offer, onSubmit, isSubmitInProgress }: SubmitPortfolioProps) => {
  const [predictions, setPredictions] = useState<DigitalAssetPricePrediction[]>([]);

  const { data: pricesSnapshots } = useDigitalAssetsPricesSnapshotsQuery();

  const { priceDirections, selectedAssets } = useMemo(() => {
    return predictions.reduce(
      (aggregation, prediction) => {
        aggregation.priceDirections[prediction.assetId] = prediction.priceDirection;
        aggregation.selectedAssets.push(prediction.assetId);

        return aggregation;
      },
      {
        selectedAssets: [] as DigitalAssetId[],
        priceDirections: {} as Record<string, DigitalAssetPriceDirection>,
      },
    );
  }, [predictions]);

  const handleAssetClick = useCallback(
    (assetId: DigitalAssetId) => {
      setPredictions((previousPredictions) => {
        const hasToken = previousPredictions.some((prediction) => prediction.assetId === assetId);

        if (hasToken) {
          return previousPredictions.filter((prediction) => prediction.assetId !== assetId);
        }

        if (previousPredictions.length >= MAX_PREDICTIONS_PER_PORTFOLIO) {
          const [, ...restPredictions] = previousPredictions;

          return [...restPredictions, { assetId, priceDirection: DigitalAssetPriceDirection.Up }];
        }

        return [...previousPredictions, { assetId, priceDirection: DigitalAssetPriceDirection.Up }];
      });
    },
    [setPredictions],
  );

  const handleAssetPriceDirectionSelect = useCallback(
    (assetId: string, priceDirection: DigitalAssetPriceDirection) => {
      setPredictions((previousPredictions) => {
        return previousPredictions.map((prediction) => {
          if (prediction.assetId === assetId) {
            return { ...prediction, priceDirection };
          }

          return prediction;
        });
      });
    },
    [setPredictions],
  );

  return (
    <div className={styles.submitPortfolioContainer}>
      <Typography color="gradient1" variant="h1">
        Pick {MAX_PREDICTIONS_PER_PORTFOLIO} Tokens
      </Typography>
      <Typography alignment="center" className={styles.submitPortfolioDescription} variant="body1">
        Select if token will go{' '}
        <Typography color="green" uppercase tag="span">
          Up
        </Typography>{' '}
        or{' '}
        <Typography uppercase color="red" tag="span">
          Down
        </Typography>
        !
      </Typography>
      <TimeRemaining unixTimestamp={offer.timestamp}>
        {({ remainingDays, remainingHours, remainingMinutes }) => {
          return (
            <Typography color="yellow" alignment="center" variant="body2">
              Offer ends in {remainingDays}d {remainingHours}h {remainingMinutes}m
            </Typography>
          );
        }}
      </TimeRemaining>
      <DigitalAssetsPricePredictionCard
        className={styles.digitalAssetsPricePredictionCard}
        availableAssets={offer.assets}
        selectedAssets={selectedAssets}
        onAssetClick={handleAssetClick}
        onAssetPriceDirectionSelect={handleAssetPriceDirectionSelect}
        priceDirections={priceDirections}
        pricesSnapshots={pricesSnapshots}
      />
      {predictions.length === MAX_PREDICTIONS_PER_PORTFOLIO && (
        <SubmitButton onClick={() => onSubmit(offer.id, predictions)} loading={isSubmitInProgress}>
          Submit
        </SubmitButton>
      )}
    </div>
  );
};

export default SubmitPortfolio;
