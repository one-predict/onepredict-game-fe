import QuestRewardType from '@enums/QuestRewardType';

export interface CoinsReward {
  type: QuestRewardType.Coins;
  coins: number;
}

export type QuestReward = CoinsReward;
