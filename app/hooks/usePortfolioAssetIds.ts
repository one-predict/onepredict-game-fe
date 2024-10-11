import { useMemo } from 'react';
import { Portfolio } from '@api/PortfolioApi';
import DigitalAssetId from '@enums/DigitalAssetId';

const usePortfolioAssetIds = (portfolio: Portfolio | null) => {
  return useMemo(() => {
    if (!portfolio) {
      return [] as DigitalAssetId[];
    }

    return portfolio.predictions.map((prediction) => prediction.assetId);
  }, [portfolio]);
};

export default usePortfolioAssetIds;
