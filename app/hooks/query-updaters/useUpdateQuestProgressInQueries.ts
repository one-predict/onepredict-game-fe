import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { Quest, QuestProgress } from '@api/QuestApi';

const useUpdateQuestProgressInQueries = () => {
  const queryClient = useQueryClient();

  return useCallback(
    (questId: string, questProgressState: QuestProgress) => {
      queryClient.setQueriesData({ queryKey: ['quests'] }, (quests: Quest[]) => {
        return quests.map((quest) => {
          return quest.id === questId ? { ...quest, progressState: questProgressState } : quest;
        });
      });
    },
    [queryClient],
  );
};

export default useUpdateQuestProgressInQueries;
