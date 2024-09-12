import { useQuery } from '@tanstack/react-query';
import { useReferralApi } from '@providers/ApiProvider';

const useMyReferrals = () => {
  const referralApi = useReferralApi();

  return useQuery({
    queryKey: ['referrals', { my: true }],
    queryFn: () => referralApi.getMyReferrals(),
  });
};

export default useMyReferrals;
