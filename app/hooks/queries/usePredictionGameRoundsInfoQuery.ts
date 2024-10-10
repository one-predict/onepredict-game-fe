import { useQuery } from '@tanstack/react-query';
import { usePredictionGameRoundApi } from '@providers/ApiProvider';

const usePredictionGameRoundsInfoQuery = () => {
  const predictionGameRoundApi = usePredictionGameRoundApi();

  return useQuery({
    queryKey: ['prediction-game-rounds-info'],
    queryFn: () => predictionGameRoundApi.getRoundsInfo(),
  });
};

export default usePredictionGameRoundsInfoQuery;
