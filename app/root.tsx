import { Outlet, Links, Meta, Scripts, ScrollRestoration, useMatches } from '@remix-run/react';
import { ReactNode, useMemo } from 'react';
import { ExternalScripts, ExternalScriptsHandle } from 'remix-utils/external-scripts';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import utcPlugin from 'dayjs/plugin/utc';
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { toast, ToastContainer } from 'react-toastify';
import { RestApiClient } from '@api/ApiClient';
import { ApiProvider, IApiProviderValue } from '@providers/ApiProvider';
import { HttpAuthApi } from '@api/AuthApi';
import { HttpUserApi } from '@api/UserApi';
import { HttpPortfolioApi } from '@api/PortfolioApi';
import { HttpPortfolioOfferApi } from '@api/PortfolioOfferApi';
import { HttpTournamentApi } from '@api/TournamentApi';
import { PageLayoutWithMenu } from '@components/Layouts';
import LoadingScreen from '@components/LoadingScreen';
import AuthorizedSection from '@components/AuthorizedSection';
import { SessionProvider } from '@providers/SessionProvider';

import './styles/global.css';
import './styles/fonts.css';
import 'react-toastify/dist/ReactToastify.css';

declare global {
  interface Window {
    Telegram: {
      WebApp: {
        initData: string;
      };
    };
  }
}

dayjs.extend(advancedFormat);
dayjs.extend(utcPlugin);

export const handle: ExternalScriptsHandle = {
  scripts: [
    {
      src: 'https://telegram.org/js/telegram-web-app.js',
      preload: true,
    },
  ],
};

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Aipick Game</title>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ExternalScripts />
        <Scripts />
        <ScrollRestoration />
      </body>
    </html>
  );
}

export function HydrateFallback() {
  return (
    <>
      <LoadingScreen />
    </>
  );
}

const App = () => {
  const matches = useMatches();
  const match = matches[matches.length - 1];

  const queryClient = useMemo(() => {
    return new QueryClient({
      queryCache: new QueryCache({
        onError: (error) => toast.error(error.message),
      }),
      mutationCache: new MutationCache({
        onError: (error) => toast.error(error.message),
      }),
    });
  }, []);

  const services: IApiProviderValue = useMemo(() => {
    const apiClient = new RestApiClient(import.meta.env.VITE_API_URL);

    return {
      authApi: new HttpAuthApi(apiClient),
      userApi: new HttpUserApi(apiClient),
      portfolioApi: new HttpPortfolioApi(apiClient),
      portfolioOfferApi: new HttpPortfolioOfferApi(apiClient),
      tournamentApi: new HttpTournamentApi(apiClient),
    };
  }, []);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ApiProvider value={services}>
          <SessionProvider>
            <AuthorizedSection>
              <PageLayoutWithMenu pageTitle={match.handle?.pageTitle} backHref={match.handle?.backHref}>
                <Outlet />
              </PageLayoutWithMenu>
            </AuthorizedSection>
            <ToastContainer toastStyle={{ zIndex: 1000000 }} position="bottom-left" />
          </SessionProvider>
        </ApiProvider>
      </QueryClientProvider>
    </>
  );
};

export default App;
