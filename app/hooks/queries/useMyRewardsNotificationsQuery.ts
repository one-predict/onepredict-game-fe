import { skipToken, useQuery } from '@tanstack/react-query';
import { useRewardsNotificationApi } from '@providers/ApiProvider';

export interface UseMyRewardsNotificationsQueryOptions {
  enabled?: boolean;
}

const useMyRewardsNotificationsQuery = (options?: UseMyRewardsNotificationsQueryOptions) => {
  const rewardsNotificationApi = useRewardsNotificationApi();

  return useQuery({
    queryKey: ['rewards-notifications', { my: true }],
    queryFn: options?.enabled ? () => rewardsNotificationApi.getMyRewardsNotifications() : skipToken,
  });
};

export default useMyRewardsNotificationsQuery;
