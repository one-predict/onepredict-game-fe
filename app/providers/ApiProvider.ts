import { createContext, useContext } from 'react';
import { PortfolioApi } from '@api//PortfolioApi';
import { AuthApi } from '@api/AuthApi';
import { UserApi } from '@api/UserApi';
import { TokensOfferApi } from '@api/TokensOfferApi';
import { TournamentApi } from '@api/TournamentApi';
import { GameCardApi } from '@api/GameCardApi';
import { UserInventoryApi } from '@api/UserInventoryApi';
import { GameCardsMarketplaceApi } from '@api/GameCardsMarketplaceApi';
import { ReferralApi } from '@api/ReferralApi';
import { DigitalAssetsPricesSnapshotApi } from '@api/DigitalAssetsPricesSnapshotApi';
import { RewardsNotificationApi } from '@api/RewardsNotificationApi';
import { QuestApi } from '@api/QuestApi';
import { PredictionChoiceApi } from '@api/PredictionChoiceApi';
import { PredictionGameRoundApi } from '@api/PredictionGameRoundApi';
import { PredictionStreakApi } from '@api/PredictionStreakApi';
import { DigitalAssetsTickApi } from '@api/DigitalAssetsTickApi';

export interface ApiProviderValue {
  authApi: AuthApi;
  userApi: UserApi;
  portfolioApi: PortfolioApi;
  tokensOfferApi: TokensOfferApi;
  tournamentApi: TournamentApi;
  gameCardApi: GameCardApi;
  userInventoryApi: UserInventoryApi;
  gameCardsMarketplaceApi: GameCardsMarketplaceApi;
  referralApi: ReferralApi;
  digitalAssetsPricesSnapshotApi: DigitalAssetsPricesSnapshotApi;
  rewardsNotificationApi: RewardsNotificationApi;
  questApi: QuestApi;
  predictionChoiceApi: PredictionChoiceApi;
  predictionGameRoundApi: PredictionGameRoundApi;
  predictionStreakApi: PredictionStreakApi;
  digitalAssetsTickApi: DigitalAssetsTickApi;
}

export type Services =
  | AuthApi
  | UserApi
  | PortfolioApi
  | TokensOfferApi
  | TournamentApi
  | GameCardApi
  | UserInventoryApi
  | GameCardsMarketplaceApi
  | ReferralApi
  | DigitalAssetsPricesSnapshotApi
  | RewardsNotificationApi
  | QuestApi
  | PredictionChoiceApi
  | PredictionGameRoundApi
  | PredictionStreakApi
  | DigitalAssetsTickApi;

const ApiContext = createContext<ApiProviderValue>({} as ApiProviderValue);

const createServiceHook = <ServiceType extends Services>(serviceName: keyof ApiProviderValue) => {
  return () => {
    const services = useContext(ApiContext);

    return services[serviceName] as ServiceType;
  };
};

export const useAuthApi = createServiceHook<AuthApi>('authApi');
export const useUserApi = createServiceHook<UserApi>('userApi');
export const usePortfolioApi = createServiceHook<PortfolioApi>('portfolioApi');
export const useTokensOfferApi = createServiceHook<TokensOfferApi>('tokensOfferApi');
export const useTournamentApi = createServiceHook<TournamentApi>('tournamentApi');
export const useGameCardApi = createServiceHook<GameCardApi>('gameCardApi');
export const useUserInventoryApi = createServiceHook<UserInventoryApi>('userInventoryApi');
export const useGameCardsMarketplaceApi = createServiceHook<GameCardsMarketplaceApi>('gameCardsMarketplaceApi');
export const useDigitalAssetsPricesSnapshotApi = createServiceHook<DigitalAssetsPricesSnapshotApi>(
  'digitalAssetsPricesSnapshotApi',
);
export const useReferralApi = createServiceHook<ReferralApi>('referralApi');
export const useRewardsNotificationApi = createServiceHook<RewardsNotificationApi>('rewardsNotificationApi');
export const useQuestApi = createServiceHook<QuestApi>('questApi');
export const usePredictionChoiceApi = createServiceHook<PredictionChoiceApi>('predictionChoiceApi');
export const usePredictionGameRoundApi = createServiceHook<PredictionGameRoundApi>('predictionGameRoundApi');
export const usePredictionStreakApi = createServiceHook<PredictionStreakApi>('predictionStreakApi');
export const useDigitalAssetsTickApi = createServiceHook<DigitalAssetsTickApi>('digitalAssetsTickApi');

export const ApiProvider = ApiContext.Provider;
