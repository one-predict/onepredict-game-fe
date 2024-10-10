import { useQuery } from '@tanstack/react-query';
import { useDigitalAssetsPricesSnapshotApi } from '@providers/ApiProvider';
import DigitalAssetsPricesSnapshotsPeriod from '@enums/DigitalAssetsPricesSnapshotsPeriod';

const useDigitalAssetsPricesSnapshotsQuery = (period = DigitalAssetsPricesSnapshotsPeriod.TwentyFourHours) => {
  const digitalAssetsPricesSnapshotApi = useDigitalAssetsPricesSnapshotApi();

  return useQuery({
    queryKey: ['digital-assets-prices-snapshots', { latest: true, period }],
    queryFn: async () => {
      const snapshots = await digitalAssetsPricesSnapshotApi.getLatestSnapshots(period);

      return [...snapshots].reverse();
    },
  });
};

export default useDigitalAssetsPricesSnapshotsQuery;
