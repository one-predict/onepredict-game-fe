import { createContext, useContext } from 'react';
import { PortfolioApi } from '@api//PortfolioApi';
import { AuthApi } from '@api/AuthApi';
import { UserApi } from '@api/UserApi';
import { PortfolioOfferApi } from '@api/PortfolioOfferApi';
import { TournamentApi } from '@api/TournamentApi';

export interface IApiProviderValue {
  authApi: AuthApi;
  userApi: UserApi;
  portfolioApi: PortfolioApi;
  portfolioOfferApi: PortfolioOfferApi;
  tournamentApi: TournamentApi;
}

export type Services = AuthApi | UserApi | PortfolioApi | PortfolioOfferApi | TournamentApi;

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

export const ApiProvider = ApiContext.Provider;
