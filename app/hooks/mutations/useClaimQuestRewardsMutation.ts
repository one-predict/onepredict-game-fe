import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import QuestRewardType from '@enums/QuestRewardType';
import { ClaimQuestRewardsResult } from '@api/QuestApi';
import { useQuestApi } from '@providers/ApiProvider';
import { User } from '@api/UserApi';
import useUpdateQuestProgressInQueries from '@hooks/query-updaters/useUpdateQuestProgressInQueries';

const useClaimQuestRewardsMutation = () => {
  const questApi = useQuestApi();

  const queryClient = useQueryClient();

  const updateQuestProgressInQueries = useUpdateQuestProgressInQueries();

  const handleSuccess = useCallback(
    async (result: ClaimQuestRewardsResult, questId: string) => {
      result.rewards.forEach((reward) => {
        if (reward.type === QuestRewardType.Coins) {
          queryClient.setQueryData(['current-user'], (user: User | null) => {
            return user && { ...user, coinsBalance: user.coinsBalance + reward.coins };
          });
        }
      });

      updateQuestProgressInQueries(questId, result.progressState);

      toast.success('Congratulations! You have successfully claimed the rewards!');
    },
    [queryClient, updateQuestProgressInQueries],
  );

  return useMutation({
    mutationFn: (questId: string) => questApi.claimQuestRewards(questId),
    onSuccess: handleSuccess,
  });
};

export default useClaimQuestRewardsMutation;
