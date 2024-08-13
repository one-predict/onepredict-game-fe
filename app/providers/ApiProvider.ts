import { createContext, useContext } from 'react';
import { PortfolioApi } from '@api//PortfolioApi';
import { AuthApi } from '@api/AuthApi';
import { UserApi } from '@api/UserApi';
import { PortfolioOfferApi } from '@api/PortfolioOfferApi';
import { TournamentApi } from '@api/TournamentApi';
import { GameCardApi } from '@api/GameCardApi';
import { UserInventoryApi } from '@api/UserInventoryApi';
import { PortfolioCardsDeckApi } from '@api/PortfolioCardsDeckApi';
import { GameCardsMarketplaceApi } from '@api/GameCardsMarketplaceApi';

export interface IApiProviderValue {
  authApi: AuthApi;
  userApi: UserApi;
  portfolioApi: PortfolioApi;
  portfolioOfferApi: PortfolioOfferApi;
  tournamentApi: TournamentApi;
  gameCardApi: GameCardApi;
  userInventoryApi: UserInventoryApi;
  portfolioCardsDeckApi: PortfolioCardsDeckApi;
  gameCardsMarketplaceApi: GameCardsMarketplaceApi;
}

export type Services =
  | AuthApi
  | UserApi
  | PortfolioApi
  | PortfolioOfferApi
  | TournamentApi
  | GameCardApi
  | UserInventoryApi
  | PortfolioCardsDeckApi
  | GameCardsMarketplaceApi;

const ApiContext = createContext<IApiProviderValue>({} as IApiProviderValue);

const createServiceHook = <ServiceType extends Services>(serviceName: keyof IApiProviderValue) => {
  return () => {
    const services = useContext(ApiContext);

    return services[serviceName] as ServiceType;
  };
};

export const useAuthApi = createServiceHook<AuthApi>('authApi');
export const useUserApi = createServiceHook<UserApi>('userApi');
export const usePortfolioApi = createServiceHook<PortfolioApi>('portfolioApi');
export const usePortfolioOfferApi = createServiceHook<PortfolioOfferApi>('portfolioOfferApi');
export const useTournamentApi = createServiceHook<TournamentApi>('tournamentApi');
export const useGameCardApi = createServiceHook<GameCardApi>('gameCardApi');
export const useUserInventoryApi = createServiceHook<UserInventoryApi>('userInventoryApi');
export const useGameCardsMarketplaceApi = createServiceHook<GameCardsMarketplaceApi>('gameCardsMarketplaceApi');
export const usePortfolioCardsDeckApi = createServiceHook<PortfolioCardsDeckApi>('portfolioCardsDeckApi');

export const ApiProvider = ApiContext.Provider;
