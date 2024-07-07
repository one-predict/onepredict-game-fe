import './fonts.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import dayjs from 'dayjs';
import { AuthKitProvider } from '@farcaster/auth-kit';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { JsonRpcProvider } from 'ethers';
import { MetaMaskProvider } from '@metamask/sdk-react';
import {
  QueryClient,
  QueryClientProvider,
  QueryCache,
  MutationCache,
} from '@tanstack/react-query';
import { ApiProvider, IApiProviderValue } from '@providers/ApiProvider';
import { SessionProvider } from '@providers/SessionProvider';
import { RestApiClient } from '@app/api/ApiClient';
import { HttpAuthApi } from '@app/api/AuthApi';
import { HttpPortfolioApi } from '@app/api/PortfolioApi';
import { HttpUserApi } from '@app/api/UserApi';
import { HttpPortfolioOfferApi } from '@app/api/PortfolioOfferApi';
import AuthorizedSection from '@components/AuthorizedSection';
import UnauthorizedSection from '@components/UnauthorizedSection';
import SignInPage from '@pages/SignInPage';
import PortfoliosPage from '@pages/PortfoliosPage';
import HomePage from '@pages/HomePage';
import BattlesPage from '@pages/BattlesPage';
import TournamentsPage from '@pages/TournamentsPage';
import theme from './theme';
import 'react-toastify/dist/ReactToastify.css';


dayjs.extend(advancedFormat);

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }
  
  * {
    margin: 0;
  }
  
  html {
    font-size: 16px;
  }
  
  body, html {
    height: 100%;
    width: 100%;
  }

  img, picture, video, canvas, svg {
    display: block;
    max-width: 100%;
  }
  
  body {
    overflow-x: hidden;
    font-family: 'Orbitron', sans-serif;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }

  p, h1, h2, h3, h4, h5, h6 {
    overflow-wrap: break-word;
  }
  
  button {
    font-family: 'Orbitron', sans-serif;
  }
  
  #root {
    isolation: isolate;
    margin: 0;
    padding: 0;
    height: 100%;
    min-height: 100%;
    width: 100%;
    max-width: unset;
  }
  
  .fc-authkit-qrcode-dialog {
    position: fixed;
    top: 0;
  }
`;

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => toast.error(error.message),
  }),
  mutationCache: new MutationCache({
    onError: (error) => toast.error(error.message),
  }),
});

const config = {
  relay: import.meta.env.VITE_AUTH_RELAY,
  rpcUrl: import.meta.env.VITE_AUTH_RPC_URL,
  domain: window.location.host,
  provider: new JsonRpcProvider('', Number(import.meta.env.VITE_AUTH_PROVIDER_NETWORK)),
};

const apiClient = new RestApiClient(import.meta.env.VITE_API_URL);

const services: IApiProviderValue = {
  authApi: new HttpAuthApi(apiClient),
  userApi: new HttpUserApi(apiClient),
  portfolioApi: new HttpPortfolioApi(apiClient),
  portfolioOfferApi: new HttpPortfolioOfferApi(apiClient),
};

const router = createBrowserRouter([{
  path: '/',
  element: (
    <AuthorizedSection>
      <HomePage />
    </AuthorizedSection>
  ),
}, {
  path: '/sign-in',
  element: (
    <UnauthorizedSection>
      <SignInPage />
    </UnauthorizedSection>
  ),
}, {
  path: '/portfolios',
  element: (
    <AuthorizedSection>
      <PortfoliosPage />
    </AuthorizedSection>
  ),
}, {
  path: '/battles',
  element: (
    <AuthorizedSection>
      <BattlesPage />
    </AuthorizedSection>
  ),
}, {
  path: '/tournaments',
  element: (
    <AuthorizedSection>
      <TournamentsPage />
    </AuthorizedSection>
  ),
}]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ApiProvider value={services}>
        <ThemeProvider theme={theme}>
          <SessionProvider>
            <AuthKitProvider config={config}>
              <MetaMaskProvider
                debug={false}
                sdkOptions={{ dappMetadata: {name: 'AIPick Game', url: window.location.href } }}
              >
                <GlobalStyle />
                <RouterProvider router={router} />
                <ToastContainer toastStyle={{ zIndex: 1000000 }} position="bottom-left" />
              </MetaMaskProvider>
            </AuthKitProvider>
          </SessionProvider>
        </ThemeProvider>
      </ApiProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
