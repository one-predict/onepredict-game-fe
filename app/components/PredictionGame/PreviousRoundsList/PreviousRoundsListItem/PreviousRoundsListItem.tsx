import clsx from 'clsx';
import { PredictionChoice } from '@api/PredictionChoiceApi';
import DigitalAssetImage from '@components/DigitalAssetImage';
import Typography from '@components/Typography';
import CoinsDisplay from '@components/CoinsDisplay';
import styles from './PreviousRoundsListItem.module.scss';

export interface PreviousRoundsListItemProps {
  choice: PredictionChoice;
}

const PreviousRoundsListItem = ({ choice }: PreviousRoundsListItemProps) => {
  return (
    <div className={styles.previousRoundsListItem}>
      <div className={styles.assetImagesContainer}>
        {choice.predictions.map((prediction) => {
          const { result } = choice;

          const isWrongPrediction = result && !result.predictionSummaries[prediction.assetId].correct;

          return (
            <div
              key={prediction.assetId}
              className={clsx(styles.tokenPredictionResult, isWrongPrediction && styles.wrongPredictionAssetImage)}
            >
              <DigitalAssetImage className={styles.assetImage} key={prediction.assetId} assetId={prediction.assetId} />
            </div>
          );
        })}
      </div>
      {choice.isAwarded && choice.result !== undefined ? (
        <CoinsDisplay coins={choice.result.earnedCoins} reversed />
      ) : (
        <Typography variant="h6" color="gray">
          Calculating...
        </Typography>
      )}
    </div>
  );
};

export default PreviousRoundsListItem;
