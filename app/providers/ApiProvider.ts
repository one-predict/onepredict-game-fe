import { createContext, useContext } from 'react';
import { PortfolioApi } from '@api//PortfolioApi';
import { AuthApi } from '@api/AuthApi';
import { UserApi } from '@api/UserApi';
import { TokensOfferApi } from '@api/TokensOfferApi';
import { TournamentApi } from '@api/TournamentApi';
import { GameCardApi } from '@api/GameCardApi';
import { UserInventoryApi } from '@api/UserInventoryApi';
import { TournamentDeckApi } from '@api/TournamentDeck';
import { GameCardsMarketplaceApi } from '@api/GameCardsMarketplaceApi';
import { CoinsPricingInfoApi } from '@api/CoinsPricingInfoApi';

export interface ApiProviderValue {
  authApi: AuthApi;
  userApi: UserApi;
  portfolioApi: PortfolioApi;
  tokensOfferApi: TokensOfferApi;
  tournamentApi: TournamentApi;
  gameCardApi: GameCardApi;
  userInventoryApi: UserInventoryApi;
  tournamentDeckApi: TournamentDeckApi;
  gameCardsMarketplaceApi: GameCardsMarketplaceApi;
  coinsPricingInfoApi: CoinsPricingInfoApi;
}

export type Services =
  | AuthApi
  | UserApi
  | PortfolioApi
  | TokensOfferApi
  | TournamentApi
  | GameCardApi
  | UserInventoryApi
  | TournamentDeckApi
  | GameCardsMarketplaceApi
  | CoinsPricingInfoApi;

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
export const useTournamentDeckApi = createServiceHook<TournamentDeckApi>('tournamentDeckApi');
export const useCoinsPricingInfoApi = createServiceHook<CoinsPricingInfoApi>('coinsPricingInfoApi');

export const ApiProvider = ApiContext.Provider;
