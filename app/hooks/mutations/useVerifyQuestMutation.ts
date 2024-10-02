import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { QuestProgress } from '@api/QuestApi';
import { useQuestApi } from '@providers/ApiProvider';
import useUpdateQuestProgressInQueries from '@hooks/query-updaters/useUpdateQuestProgressInQueries';

const useVerifyQuestMutation = () => {
  const questApi = useQuestApi();

  const updateQuestProgressInQueries = useUpdateQuestProgressInQueries();

  const handleSuccess = useCallback(
    async (questProgress: QuestProgress, questId: string) => {
      updateQuestProgressInQueries(questId, questProgress);

      toast.success('Task verification completed!');
    },
    [updateQuestProgressInQueries],
  );

  return useMutation({
    mutationFn: (questId: string) => questApi.verifyQuest(questId),
    onSuccess: handleSuccess,
  });
};

export default useVerifyQuestMutation;
