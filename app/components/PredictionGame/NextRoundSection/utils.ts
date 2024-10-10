import { PredictionChoice } from '@api/PredictionChoiceApi';
import DigitalAssetPriceDirection from '@enums/DigitalAssetPriceDirection';

export const getPriceDirectionsFromChoice = (choice: PredictionChoice) => {
  return choice.predictions.reduce(
    (previousPriceDirections, prediction) => {
      previousPriceDirections[prediction.assetId] = prediction.priceDirection;

      return previousPriceDirections;
    },
    {} as Record<string, DigitalAssetPriceDirection>,
  );
};
