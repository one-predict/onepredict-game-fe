import { useQuery } from '@tanstack/react-query';
import { useCoinsHistoryApi } from '@providers/ApiProvider';
import CoinsHistoricalRecordsPeriod from '@enums/CoinsHistoricalRecordsPeriod';

const useLatestCompletedCoinsHistoryQuery = (period = CoinsHistoricalRecordsPeriod.TwentyFourHours) => {
  const coinsHistoryApi = useCoinsHistoryApi();

  return useQuery({
    queryKey: ['coins-historical-records', { latest: true, completed: true, period }],
    queryFn: async () => {
      const records = await coinsHistoryApi.getLatestCompletedCoinsHistory(period);

      return [...records].reverse();
    },
  });
};

export default useLatestCompletedCoinsHistoryQuery;
