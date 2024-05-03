import { createContext, useContext } from 'react';
import { AuthApi } from '../api/AuthApi';
import { UserApi } from '../api/UserApi';
import { PortfolioApi } from '../api/PortfolioApi';
import { PortfolioOfferApi } from '../api/PortfolioOfferApi';

export interface IApiProviderValue {
  authApi: AuthApi;
  userApi: UserApi;
  portfolioApi: PortfolioApi;
  portfolioOfferApi: PortfolioOfferApi;
}

export type Services = AuthApi | UserApi | PortfolioApi | PortfolioOfferApi;

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

const ApiProvider = ApiContext.Provider;

export default ApiProvider;
