import AnyObject from '@types/AnyObject';
import QuestObjectiveType from '@enums/QuestObjectiveType';
import ObjectiveVerificationType from '@enums/ObjectiveVerificationType';

export interface BaseQuestObjective<Type extends QuestObjectiveType, Config extends AnyObject = AnyObject> {
  type: Type;
  config: Config;
  verificationType: ObjectiveVerificationType;
}

/**
 * Quest objective processing state start
 */
export interface EarnCoinsObjectiveProcessingState {
  amount: number;
}

export interface JoinTournamentObjectiveProcessingState {
  tournamentId?: string;
}

export type ObjectiveProcessingState = EarnCoinsObjectiveProcessingState | JoinTournamentObjectiveProcessingState;
/**
 * Quest objective processing state end
 */

/**
 * Quest objective config start
 */
export interface EarnCoinsObjectiveConfig {
  amount: number;
}

export interface JoinTournamentObjectiveConfig {
  tournamentId?: string;
}

export interface SubscribeSocialsObjectiveConfig {
  socialLink: string;
}

export interface FollowTelegramChannelObjectiveConfig {
  channelId: string;
}
/**
 * Quest objective config end
 */

/**
 * Quest objective start
 */
export type EarnCoinsObjective = BaseQuestObjective<QuestObjectiveType.EarnCoins, EarnCoinsObjectiveConfig>;

export type JoinTournamentObjective = BaseQuestObjective<
  QuestObjectiveType.JoinTournament,
  JoinTournamentObjectiveConfig
>;

export type SubscribeSocialsObjective = BaseQuestObjective<
  QuestObjectiveType.SubscribeSocials,
  SubscribeSocialsObjectiveConfig
>;

export type FollowTelegramChannelObjective = BaseQuestObjective<
  QuestObjectiveType.FollowTelegramChannel,
  FollowTelegramChannelObjectiveConfig
>;

export type QuestObjective =
  | EarnCoinsObjective
  | JoinTournamentObjective
  | SubscribeSocialsObjective
  | FollowTelegramChannelObjective;
/**
 * Quest objective end
 */
