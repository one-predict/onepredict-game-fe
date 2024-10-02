import { Quest } from '@api/QuestApi';
import { isInfiniteDate } from '@utils/date';

export const isQuestHasEndDate = (quest: Quest) => {
  return !isInfiniteDate(new Date(quest.endsAt));
};
