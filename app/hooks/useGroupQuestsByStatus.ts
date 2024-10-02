import { useMemo } from 'react';
import { Quest } from '@api/QuestApi';
import QuestProgressStatus from '@enums/QuestProgressStatus';

const useGroupQuestsByStatus = (quests: Quest[] | null | undefined) => {
  return useMemo(() => {
    if (!quests) {
      return {
        availableQuests: [],
        completedQuests: [],
      };
    }

    return quests.reduce(
      (result, quest) => {
        if (quest.progressState?.status === QuestProgressStatus.Completed) {
          result.completedQuests.push(quest);
        } else {
          result.availableQuests.push(quest);
        }

        return result;
      },
      {
        availableQuests: [] as Quest[],
        completedQuests: [] as Quest[],
      },
    );
  }, [quests]);
};

export default useGroupQuestsByStatus;
