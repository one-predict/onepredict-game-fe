import { useQuery } from '@tanstack/react-query';
import { usePredictionChoiceApi } from '@providers/ApiProvider';

const PREDICTION_CHOICES_LIMIT = 24;

const useMyPredictionChoicesQuery = () => {
  const predictionChoiceApi = usePredictionChoiceApi();

  return useQuery({
    queryKey: ['prediction-choices', { my: true }],
    queryFn: () => predictionChoiceApi.getMyLatestChoices(PREDICTION_CHOICES_LIMIT),
  });
};

export default useMyPredictionChoicesQuery;
