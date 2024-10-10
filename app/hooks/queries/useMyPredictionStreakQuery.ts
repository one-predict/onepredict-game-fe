import { useQuery } from '@tanstack/react-query';
import { usePredictionStreakApi } from '@providers/ApiProvider';

const useMyPredictionStreakQuery = () => {
  const predictionStreakApi = usePredictionStreakApi();

  return useQuery({
    queryKey: ['prediction-streaks', { my: true }],
    queryFn: () => predictionStreakApi.getMyPredictionStreak(),
  });
};

export default useMyPredictionStreakQuery;
