import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AnyRewardsNotification } from '@api/RewardsNotificationApi';
import { useRewardsNotificationApi } from '@providers/ApiProvider';

const useAckRewardsNotificationMutation = () => {
  const rewardsNotificationApi = useRewardsNotificationApi();

  const queryClient = useQueryClient();

  const handleMutate = useCallback(
    async (id: string) => {
      queryClient.setQueryData(['rewards-notifications', { my: true }], (notifications: AnyRewardsNotification[]) => {
        return notifications.filter((notification) => notification.id !== id);
      });

      toast.success('Your rewards have been claimed!');
    },
    [queryClient],
  );

  return useMutation({
    mutationFn: (id: string) => rewardsNotificationApi.acknowledgeRewardsNotification(id),
    onMutate: handleMutate,
  });
};

export default useAckRewardsNotificationMutation;
