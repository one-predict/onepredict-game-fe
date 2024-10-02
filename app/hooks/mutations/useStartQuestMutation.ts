import { useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { QuestProgress } from '@api/QuestApi';
import { useQuestApi } from '@providers/ApiProvider';
import useUpdateQuestProgressInQueries from '@hooks/query-updaters/useUpdateQuestProgressInQueries';

const useStartQuestMutation = () => {
  const questApi = useQuestApi();

  const updateQuestProgressInQueries = useUpdateQuestProgressInQueries();

  const handleSuccess = useCallback(
    async (questProgress: QuestProgress, questId: string) => {
      updateQuestProgressInQueries(questId, questProgress);
    },
    [updateQuestProgressInQueries],
  );

  return useMutation({
    mutationFn: (questId: string) => questApi.startQuest(questId),
    onSuccess: handleSuccess,
  });
};

export default useStartQuestMutation;
