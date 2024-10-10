import { useMemo } from 'react';
import { DigitalAssetsPricesSnapshot } from '@api/DigitalAssetsPricesSnapshotApi';

const useAssetsSparklinePoints = (pricesSnapshots: DigitalAssetsPricesSnapshot[] | undefined) => {
  return useMemo(() => {
    if (!pricesSnapshots) {
      return null;
    }

    return pricesSnapshots.reduce(
      (result, snapshot) => {
        Object.keys(snapshot.prices).forEach((assetId) => {
          if (!result[assetId]) {
            result[assetId] = [];
          }

          result[assetId].push(snapshot.prices[assetId]);
        });

        return result;
      },
      {} as Record<string, number[]>,
    );
  }, [pricesSnapshots]);
};

export default useAssetsSparklinePoints;
