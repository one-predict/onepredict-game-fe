import { useMemo } from 'react';
import clsx from 'clsx';
import { TokensOffer } from '@api/TokensOfferApi';
import { Portfolio } from '@api/PortfolioApi';
import { DigitalAssetsPricesSnapshot } from '@api/DigitalAssetsPricesSnapshotApi';
import { DigitalAssetLatestTick } from '@api/DigitalAssetsTickApi';
import DigitalAssetId from '@enums/DigitalAssetId';
import useDigitalAssetsLatestTickQuery from '@hooks/queries/useDigitalAssetsLatestTickQuery';
import usePortfolioAssetIds from '@hooks/usePortfolioAssetIds';
import useDigitalAssetsPricesSnapshotQuery from '@hooks/queries/useDigitalAssetsPricesSnapshotQuery';
import Typography from '@components/Typography';
import TimeRemaining from '@components/TimeRemaining';
import DigitalAssetPricePredictionView from '@components/DigitalAssetPricePredictionView';
import styles from './LiveOffer.module.scss';

export interface LiveOfferProps {
  liveOffer: TokensOffer;
  livePortfolio: Portfolio | null;
}

const getAssetPriceChange = (
  assetId: DigitalAssetId,
  snapshot: DigitalAssetsPricesSnapshot | null,
  ticks: Record<string, DigitalAssetLatestTick> | null,
) => {
  const tick = ticks?.[assetId];

  if (!tick) {
    return undefined;
  }

  if (!snapshot) {
    return tick.currentHourPriceChangePercentage;
  }

  const snapshotAssetPrice = snapshot.prices[assetId];
  const currentAssetPrice = tick.price;

  return ((currentAssetPrice - snapshotAssetPrice) / snapshotAssetPrice) * 100;
};

const LiveOffer = ({ livePortfolio, liveOffer }: LiveOfferProps) => {
  const portfolioAssets = usePortfolioAssetIds(livePortfolio);

  const { data: snapshot } = useDigitalAssetsPricesSnapshotQuery(liveOffer.timestamp);
  const { data: ticks } = useDigitalAssetsLatestTickQuery(portfolioAssets);

  return livePortfolio ? (
    <div className={styles.livePortfolio}>
      <Typography variant="h1" color="gradient1">
        Your choice:
      </Typography>
      <TimeRemaining unixTimestamp={liveOffer.timestamp + liveOffer.durationInSeconds}>
        {({ remainingDays, remainingHours, remainingMinutes }) => {
          return (
            <Typography color="yellow" alignment="center" variant="body2">
              Ends in {remainingDays}d {remainingHours}h {remainingMinutes}m
            </Typography>
          );
        }}
      </TimeRemaining>
      <div className={clsx(styles.livePortfolioCard)}>
        {livePortfolio.predictions.map((prediction) => {
          return (
            <DigitalAssetPricePredictionView
              key={prediction.assetId}
              prediction={prediction}
              priceChange={getAssetPriceChange(prediction.assetId, snapshot ?? null, ticks ?? null)}
            />
          );
        })}
      </div>
    </div>
  ) : (
    <Typography className={styles.noLivePortfolioTypography} variant="subtitle1">
      You did not submit your portfolio
    </Typography>
  );
};

export default LiveOffer;
