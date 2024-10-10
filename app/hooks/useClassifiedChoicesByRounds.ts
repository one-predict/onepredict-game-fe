import { useMemo } from 'react';
import { PredictionChoice } from '@api/PredictionChoiceApi';
import { PredictionGameRoundsInfo } from '@api/PredictionGameRoundApi';

const useClassifiedChoicesByRounds = (choices: PredictionChoice[], roundsInfo: PredictionGameRoundsInfo) => {
  return useMemo(() => {
    return choices.reduce<{
      nextRoundChoice: PredictionChoice | null;
      liveRoundChoice: PredictionChoice | null;
      previousRoundsChoices: PredictionChoice[];
    }>(
      (aggregation, choice) => {
        if (choice.round === roundsInfo.nextRound) {
          aggregation.nextRoundChoice = choice;
        } else if (choice.round === roundsInfo.currentRound) {
          aggregation.liveRoundChoice = choice;
        } else {
          aggregation.previousRoundsChoices.push(choice);
        }

        return aggregation;
      },
      {
        nextRoundChoice: null,
        liveRoundChoice: null,
        previousRoundsChoices: [],
      },
    );
  }, [choices, roundsInfo]);
};

export default useClassifiedChoicesByRounds;
