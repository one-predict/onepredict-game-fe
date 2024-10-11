import { Outlet, Links, Meta, Scripts, ScrollRestoration, useMatches } from '@remix-run/react';
import { ReactNode, useMemo } from 'react';
import { SDKProvider } from '@telegram-apps/sdk-react';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import utcPlugin from 'dayjs/plugin/utc';
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { toast, ToastContainer } from 'react-toastify';
import { RestApiClient } from '@api/ApiClient';
import { ApiProvider, ApiProviderValue } from '@providers/ApiProvider';
import { HttpAuthApi } from '@api/AuthApi';
import { HttpUserApi } from '@api/UserApi';
import { HttpPortfolioApi } from '@api/PortfolioApi';
import { HttpTokensOfferApi } from '@api/TokensOfferApi';
import { HttpTournamentApi } from '@api/TournamentApi';
import { HttpGameCardApi } from '@api/GameCardApi';
import { HttpUserInventoryApi } from '@api/UserInventoryApi';
import { HttpGameCardsMarketplaceApi } from '@api/GameCardsMarketplaceApi';
import { HttpReferralApi } from '@api/ReferralApi';
import { HttpDigitalAssetsPricesSnapshotApi } from '@api/DigitalAssetsPricesSnapshotApi';
import { HttpRewardsNotificationApi } from '@api/RewardsNotificationApi';
import { HttpQuestApi } from '@api/QuestApi';
import { HttpUserPredictionChoiceApi } from '@api/PredictionChoiceApi';
import { HttpPredictionGameRoundApi } from '@api/PredictionGameRoundApi';
import { HttpPredictionStreakApi } from '@api/PredictionStreakApi';
import { HttpDigitalAssetsTickApi } from '@api/DigitalAssetsTickApi';
import { PageLayoutWithMenu } from '@components/Layouts';
import LoadingScreen from '@components/LoadingScreen';
import AuthorizedSection from '@components/AuthorizedSection';
import AppInitializer from '@components/AppInitializer';
import TelegramInit from '@components/TelegramInit';
import ErrorBoundary from '@components/ErrorBoundary';

import 'react-toastify/dist/ReactToastify.css';
import './styles/global.css';
import './styles/fonts.css';

dayjs.extend(advancedFormat);
dayjs.extend(utcPlugin);

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>OnePredict Telegram Game</title>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <Scripts />
        <ScrollRestoration />
      </body>
    </html>
  );
}

export function HydrateFallback() {
  return (
    <>
      <LoadingScreen progress={0} />
    </>
  );
}

const App = () => {
  const matches = useMatches();
  const match = matches[matches.length - 1];

  const pageBackground = match.handle?.background;

  const queryClient = useMemo(() => {
    return new QueryClient({
      queryCache: new QueryCache({
        onError: (error) => toast.error(error.message),
      }),
      mutationCache: new MutationCache({
        onError: (error) => toast.error(error.message),
      }),
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          refetchOnReconnect: false,
          refetchIntervalInBackground: false,
        },
      },
    });
  }, []);

  const services: ApiProviderValue = useMemo(() => {
    const apiClient = new RestApiClient(import.meta.env.VITE_API_URL);

    return {
      authApi: new HttpAuthApi(apiClient),
      userApi: new HttpUserApi(apiClient),
      portfolioApi: new HttpPortfolioApi(apiClient),
      tokensOfferApi: new HttpTokensOfferApi(apiClient),
      tournamentApi: new HttpTournamentApi(apiClient),
      gameCardApi: new HttpGameCardApi(apiClient),
      userInventoryApi: new HttpUserInventoryApi(apiClient),
      gameCardsMarketplaceApi: new HttpGameCardsMarketplaceApi(apiClient),
      referralApi: new HttpReferralApi(apiClient),
      digitalAssetsPricesSnapshotApi: new HttpDigitalAssetsPricesSnapshotApi(apiClient),
      rewardsNotificationApi: new HttpRewardsNotificationApi(apiClient),
      questApi: new HttpQuestApi(apiClient),
      predictionChoiceApi: new HttpUserPredictionChoiceApi(apiClient),
      predictionGameRoundApi: new HttpPredictionGameRoundApi(apiClient),
      predictionStreakApi: new HttpPredictionStreakApi(apiClient),
      digitalAssetsTickApi: new HttpDigitalAssetsTickApi(apiClient),
    };
  }, []);

  return (
    <ErrorBoundary>
      <SDKProvider debug>
        <TelegramInit />
        <QueryClientProvider client={queryClient}>
          <ApiProvider value={services}>
            <AppInitializer>
              <AuthorizedSection>
                <PageLayoutWithMenu background={pageBackground}>
                  <Outlet />
                </PageLayoutWithMenu>
              </AuthorizedSection>
              <ToastContainer
                pauseOnFocusLoss={false}
                pauseOnHover={false}
                theme="dark"
                toastStyle={{ zIndex: 1000000 }}
                position="top-right"
              />
            </AppInitializer>
          </ApiProvider>
        </QueryClientProvider>
      </SDKProvider>
    </ErrorBoundary>
  );
};

export default App;
