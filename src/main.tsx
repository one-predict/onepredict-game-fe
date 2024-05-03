import React from 'react';
import { ThemeProvider } from 'styled-components';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthKitProvider } from '@farcaster/auth-kit';
import theme from './theme';
import { JsonRpcProvider } from 'ethers';
import { MetaMaskProvider } from '@metamask/sdk-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SessionProvider from './providers/SessionProvider';
import ApiServiceProvider, { IApiProviderValue } from './providers/ApiServiceProvider';
import HttpAuthApi from './api/AuthApi';
import RestApiClient from './api/ApiClient';
import HttpUserApi from './api/UserApi';
import HttpPortfolioApi from './api/PortfolioApi.ts';
import HttpPortfolioOfferApi from './api/PortfolioOfferApi.ts';

const queryClient = new QueryClient();

const config = {
  // For a production app, replace this with an Optimism Mainnet
  // RPC URL from a provider like Alchemy or Infura.
  relay: 'https://relay.farcaster.xyz',
  rpcUrl: 'https://mainnet.optimism.io',
  domain: 'example.com',
  siweUri: 'https://example.com/login',
  provider: new JsonRpcProvider(undefined, 10),
};

const apiClient = new RestApiClient(import.meta.env.VITE_API_URL);

const services: IApiProviderValue = {
  authApi: new HttpAuthApi(apiClient),
  userApi: new HttpUserApi(apiClient),
  portfolioApi: new HttpPortfolioApi(apiClient),
  portfolioOfferApi: new HttpPortfolioOfferApi(apiClient),
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ApiServiceProvider value={services}>
        <ThemeProvider theme={theme}>
          <SessionProvider>
            <AuthKitProvider config={config}>
              <MetaMaskProvider
                debug={false}
                sdkOptions={{
                  dappMetadata: {
                    name: 'Example React Dapp',
                    url: window.location.href,
                  },
                }}
              >
                <App />
              </MetaMaskProvider>
            </AuthKitProvider>
          </SessionProvider>
        </ThemeProvider>
      </ApiServiceProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
