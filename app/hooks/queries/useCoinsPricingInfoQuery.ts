import { useQuery } from '@tanstack/react-query';
import { useCoinsPricingInfoApi } from '@providers/ApiProvider';

const useCoinsPricingInfoQuery = () => {
  const coinsPricingInfoApi = useCoinsPricingInfoApi();

  return useQuery({
    queryKey: ['coins-pricing-info'],
    refetchInterval: 1000 * 60 * 5, // 5 minutes in ms
    refetchIntervalInBackground: true,
    queryFn: () => coinsPricingInfoApi.get(),
  });
};

export default useCoinsPricingInfoQuery;
