import { createContext, useMemo, ReactNode } from 'react';
import { useLaunchParams } from '@telegram-apps/sdk-react';
import { mockTelegramEnv, parseInitData } from '@telegram-apps/sdk';
import { User } from '@api/UserApi';
import useCurrentUserQuery from '@hooks/queries/useCurrentUserQuery';
import useSignInMutation from '@hooks/mutations/useSignInMutation';
import useAsyncEffect from '@hooks/useAsyncEffect';
import useStartParams from '@hooks/useStartParams';

export interface SessionProviderProps {
  children: ReactNode;
}

export interface SessionValue {
  currentUser: User | null | undefined;
}

if (typeof window !== 'undefined' && import.meta.env.MODE === 'development') {
  const initDataRaw = new URLSearchParams([
    [
      'user',
      JSON.stringify({
        id: -10000,
        first_name: 'Andrew',
        last_name: 'Rogue',
        username: 'rogue',
        language_code: 'en',
        is_premium: true,
        allows_write_to_pm: true,
      }),
    ],
    ['hash', '934710745036d59235978ddef6273fa64c78e154485f1f235fa8a99f84f1b833'],
    ['auth_date', '1716922846'],
    ['start_param', 'debug'],
    ['chat_type', 'sender'],
    ['chat_instance', '8428209589180549439'],
  ]).toString();

  mockTelegramEnv({
    themeParams: {
      accentTextColor: '#6ab2f2',
      bgColor: '#17212b',
      buttonColor: '#5288c1',
      buttonTextColor: '#ffffff',
      destructiveTextColor: '#ec3942',
      headerBgColor: '#17212b',
      hintColor: '#708499',
      linkColor: '#6ab3f3',
      secondaryBgColor: '#232e3c',
      sectionBgColor: '#17212b',
      sectionHeaderTextColor: '#6ab3f3',
      subtitleTextColor: '#708499',
      textColor: '#f5f5f5',
    },
    initData: parseInitData(initDataRaw),
    initDataRaw,
    startParam: 'referralId=66c9d81214a3fd58f9624969',
    version: '7.7',
    platform: 'tdesktop',
  });
}

export const SessionContext = createContext<SessionValue>({} as SessionValue);

export const SessionProvider = ({ children }: SessionProviderProps) => {
  const { data: currentUser } = useCurrentUserQuery();
  const { mutateAsync: signIn } = useSignInMutation();

  const launchParams = useLaunchParams(true);
  const startParams = useStartParams();

  useAsyncEffect(async () => {
    if (launchParams?.initDataRaw && currentUser === null) {
      await signIn({
        signInMessage: launchParams.initDataRaw,
        referralId: startParams['referralId'],
      });
    }
  }, [launchParams, startParams, currentUser]);

  const session = useMemo(() => {
    return { currentUser };
  }, [currentUser]);

  return <SessionContext.Provider value={session}>{children}</SessionContext.Provider>;
};
