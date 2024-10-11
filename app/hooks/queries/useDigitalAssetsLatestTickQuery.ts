import { skipToken, useQuery } from '@tanstack/react-query';
import { useDigitalAssetsTickApi } from '@providers/ApiProvider';
import { DigitalAssetLatestTick } from '@api/DigitalAssetsTickApi';
import DigitalAssetId from '@enums/DigitalAssetId';

const useDigitalAssetsLatestTickQuery = (assetIds: DigitalAssetId[]) => {
  const digitalAssetsTickApi = useDigitalAssetsTickApi();

  return useQuery({
    queryKey: ['digital-assets-tick', { assetIds }],
    queryFn: assetIds.length
      ? () => {
          return digitalAssetsTickApi.getForAssets(assetIds);
        }
      : skipToken,
    placeholderData: {} as Record<string, DigitalAssetLatestTick>,
    refetchInterval: 1000 * 70, // 1 minute and 10 second
  });
};

export default useDigitalAssetsLatestTickQuery;
