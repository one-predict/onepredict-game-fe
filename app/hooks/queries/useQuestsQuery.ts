import { useQuery } from '@tanstack/react-query';
import { useQuestApi } from '@providers/ApiProvider';

const DEFAULT_GROUP = 'default';

const useQuestsQuery = (group: string = DEFAULT_GROUP) => {
  const questApi = useQuestApi();

  return useQuery({
    queryKey: ['quests', { group }],
    queryFn: () => questApi.getAvailableQuests(group),
  });
};

export default useQuestsQuery;
