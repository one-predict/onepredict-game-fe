import { useCallback } from 'react';
import AppSection from '@enums/AppSection';
import DigitalAssetPricePrediction from '@types/DigitalAssetPricePrediction';
import usePredictionGameRoundsInfoQuery from '@hooks/queries/usePredictionGameRoundsInfoQuery';
import useSubmitPredictionChoiceMutation from '@hooks/mutations/useSubmitPredictionChoiceMutation';
import useMyPredictionChoicesQuery from '@hooks/queries/useMyPredictionChoicesQuery';
import useMyPredictionStreakQuery from '@hooks/queries/useMyPredictionStreakQuery';
import useDigitalAssetsPricesSnapshotsQuery from '@hooks/queries/useDigitalAssetsPricesSnapshotsQuery';
import PageBody from '@components/PageBody';
import PredictionGame from '@components/PredictionGame';
import Loader from '@components/Loader';

export const handle = {
  appSection: AppSection.Home,
};

const HomePage = () => {
  const { data: predictionGameRoundsInfo } = usePredictionGameRoundsInfoQuery();
  const { data: predictionChoices } = useMyPredictionChoicesQuery();
  const { data: predictionStreak } = useMyPredictionStreakQuery();
  const { data: pricesSnapshots } = useDigitalAssetsPricesSnapshotsQuery();

  const { mutateAsync: submitPredictionChoice, isPending: isSubmitPredictionChoiceInProgress } =
    useSubmitPredictionChoiceMutation();

  const handleSaveNextRoundPredictions = useCallback(
    async (predictions: DigitalAssetPricePrediction[]) => {
      if (!predictionGameRoundsInfo) {
        return;
      }

      await submitPredictionChoice({ round: predictionGameRoundsInfo.nextRound, predictions });
    },
    [predictionGameRoundsInfo, submitPredictionChoice],
  );

  return (
    <PageBody>
      {predictionGameRoundsInfo && predictionChoices && predictionStreak !== undefined ? (
        <PredictionGame
          predictionStreak={predictionStreak}
          roundsInfo={predictionGameRoundsInfo}
          choices={predictionChoices}
          onSaveNextRoundPredictions={handleSaveNextRoundPredictions}
          isSaveChangesInProgress={isSubmitPredictionChoiceInProgress}
          pricesSnapshots={pricesSnapshots}
        />
      ) : (
        <Loader centered />
      )}
    </PageBody>
  );
};

export default HomePage;
