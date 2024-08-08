import { createContext, useMemo, ReactNode } from 'react';
import { useLaunchParams } from '@telegram-apps/sdk-react';
import { User } from '@api/UserApi';
import useCurrentUserQuery from '@hooks/queries/useCurrentUserQuery';
import useSignInMutation from '@hooks/mutations/useSignInMutation';
import useAsyncEffect from '@hooks/useAsyncEffect';

export interface SessionProviderProps {
  children: ReactNode;
}

export interface SessionValue {
  currentUser: User | null | undefined;
}

export const SessionContext = createContext<SessionValue>({} as SessionValue);

export const SessionProvider = ({ children }: SessionProviderProps) => {
  const { data: currentUser } = useCurrentUserQuery();
  const { mutateAsync: signIn } = useSignInMutation();

  const launchParams = useLaunchParams(true);

  useAsyncEffect(async () => {
    if (launchParams?.initDataRaw) {
      await signIn(launchParams.initDataRaw);
    }
  }, [launchParams]);

  const session = useMemo(() => {
    return { currentUser };
  }, [currentUser]);

  return <SessionContext.Provider value={session}>{children}</SessionContext.Provider>;
};
