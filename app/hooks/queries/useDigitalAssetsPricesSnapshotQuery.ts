import { skipToken, useQuery } from '@tanstack/react-query';
import { useDigitalAssetsPricesSnapshotApi } from '@providers/ApiProvider';

const useDigitalAssetsPricesSnapshotQuery = (timestamp: number) => {
  const digitalAssetsPricesSnapshotApi = useDigitalAssetsPricesSnapshotApi();

  return useQuery({
    queryKey: ['digital-assets-prices-snapshots', timestamp],
    queryFn:
      timestamp !== null
        ? () => {
            return digitalAssetsPricesSnapshotApi.getSnapshotByTimestamp(timestamp!);
          }
        : skipToken,
  });
};

export default useDigitalAssetsPricesSnapshotQuery;
