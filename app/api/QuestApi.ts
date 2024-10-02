import QuestProgressStatus from '@enums/QuestProgressStatus';
import { ApiClient } from './ApiClient';
import { QuestObjective } from '@types/QuestObjective';
import { QuestReward } from '@types/QuestReward';

export interface QuestProgress {
  status: QuestProgressStatus;
  objectiveProgressState: unknown | null;
  moderationEndDate?: Date | string;
}

export interface Quest {
  id: string;
  objective: QuestObjective;
  objectiveTags: string[];
  category: string;
  group: string;
  title: string;
  description: string;
  order: number;
  imageUrl: string | undefined;
  rewards: QuestReward[];
  endsAt: Date | string;
  progressState: QuestProgress | null;
}

export interface ClaimQuestRewardsResult {
  rewards: QuestReward[];
  progressState: QuestProgress;
}

export interface QuestApi {
  getAvailableQuests(group: string): Promise<Quest[]>;
  startQuest(questId: string): Promise<QuestProgress>;
  claimQuestRewards(questId: string): Promise<ClaimQuestRewardsResult>;
  verifyQuest(questId: string): Promise<QuestProgress>;
}

export class HttpQuestApi implements QuestApi {
  public constructor(private client: ApiClient) {}

  public getAvailableQuests(group: string) {
    const urlSearchParams = new URLSearchParams();

    urlSearchParams.append('group', group);

    return this.client.makeCall<Quest[]>(`/quests?${urlSearchParams}`, 'GET');
  }

  public claimQuestRewards(questId: string) {
    return this.client.makeCall<{
      rewards: QuestReward[];
      progressState: QuestProgress;
    }>(`/quests/${questId}/claim`, 'POST', {});
  }

  public async startQuest(questId: string) {
    const { progressState } = await this.client.makeCall<{
      progressState: QuestProgress;
    }>(`/quests/${questId}/start`, 'PUT', {});

    return progressState;
  }

  public async verifyQuest(questId: string) {
    const { progressState } = await this.client.makeCall<{
      progressState: QuestProgress;
    }>(`/quests/${questId}/verification`, 'PUT', {});

    return progressState;
  }
}
