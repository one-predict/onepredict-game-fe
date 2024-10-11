import { useMemo } from 'react';
import { PredictionChoice } from '@api/PredictionChoiceApi';
import DigitalAssetId from '@enums/DigitalAssetId';

const usePredictionChoiceAssetIds = (predictionChoice: PredictionChoice | null) => {
  return useMemo(() => {
    if (!predictionChoice) {
      return [] as DigitalAssetId[];
    }

    return predictionChoice.predictions.map((prediction) => prediction.assetId);
  }, [predictionChoice]);
};

export default usePredictionChoiceAssetIds;
