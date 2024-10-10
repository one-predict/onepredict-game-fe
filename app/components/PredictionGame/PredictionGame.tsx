import { PredictionStreak } from '@api/PredictionStreakApi';
import { PredictionGameRoundsInfo } from '@api/PredictionGameRoundApi';
import { DigitalAssetsPricesSnapshot } from '@api/DigitalAssetsPricesSnapshotApi';
import { PredictionChoice } from '@api/PredictionChoiceApi';
import DigitalAssetPricePrediction from '@types/DigitalAssetPricePrediction';
import useClassifiedChoicesByRounds from '@hooks/useClassifiedChoicesByRounds';
import NextRoundSection from '@components/PredictionGame/NextRoundSection';
import LiveRoundSection from '@components/PredictionGame/LiveRoundSection';
import PreviousRoundsSection from '@components/PredictionGame/PreviousRoundsSection';
import styles from './PredictionGame.module.scss';

export interface PredictionGameProps {
  predictionStreak: PredictionStreak | null;
  roundsInfo: PredictionGameRoundsInfo;
  choices: PredictionChoice[];
  onSaveNextRoundPredictions: (predictions: DigitalAssetPricePrediction[]) => void;
  pricesSnapshots?: DigitalAssetsPricesSnapshot[];
  isSaveChangesInProgress?: boolean;
}

const PredictionGame = ({
  predictionStreak,
  roundsInfo,
  choices,
  onSaveNextRoundPredictions,
  isSaveChangesInProgress,
  pricesSnapshots,
}: PredictionGameProps) => {
  const { liveRoundChoice, nextRoundChoice, previousRoundsChoices } = useClassifiedChoicesByRounds(choices, roundsInfo);

  const [latestPreviousRoundsChoice] = previousRoundsChoices;

  const canUseStreakForNextRound =
    !!predictionStreak &&
    !!latestPreviousRoundsChoice &&
    latestPreviousRoundsChoice.streakSequence === predictionStreak.currentSequence;

  return (
    <div className={styles.predictionGameContainer}>
      <LiveRoundSection liveRoundChoice={liveRoundChoice} />
      <NextRoundSection
        predictionStreak={canUseStreakForNextRound ? predictionStreak : null}
        nextRoundsAssets={roundsInfo.nextRoundAssets}
        nextRoundStartTimestamp={roundsInfo.nextRoundTimeBoundaries.startTimestamp}
        onSaveChanges={onSaveNextRoundPredictions}
        nextRoundChoice={nextRoundChoice}
        isSaveChangesInProgress={isSaveChangesInProgress}
        pricesSnapshots={pricesSnapshots}
      />
      <PreviousRoundsSection previousRoundsChoices={previousRoundsChoices} />
    </div>
  );
};

export default PredictionGame;
