import { useMemo } from 'react';
import { CoinsHistoricalRecord } from '@api/CoinsHistoryApi';

const useCoinsSparklinePoints = (coinsHistoricalRecords: CoinsHistoricalRecord[] | undefined) => {
  return useMemo(() => {
    if (!coinsHistoricalRecords) {
      return null;
    }

    return coinsHistoricalRecords.reduce(
      (result, record) => {
        Object.keys(record.prices).forEach((coin) => {
          if (!result[coin]) {
            result[coin] = [];
          }

          result[coin].push(record.prices[coin]);
        });

        return result;
      },
      {} as Record<string, number[]>,
    );
  }, [coinsHistoricalRecords]);
};

export default useCoinsSparklinePoints;
