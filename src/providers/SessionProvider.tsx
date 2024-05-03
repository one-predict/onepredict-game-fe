import { createContext, useMemo, ReactNode } from 'react';
import { User } from '../api/UserApi';
import { useCurrentUserQuery } from '../hooks/queries';

export interface SessionProviderProps {
  children: ReactNode;
}

export interface SessionValue {
  currentUser: User | null | undefined;
}

export const SessionContext = createContext<SessionValue>({} as SessionValue);

const SessionProvider = ({ children }: SessionProviderProps) => {
  const { data } = useCurrentUserQuery();

  const session = useMemo(() => {
    return { currentUser: data };
  }, [data]);

  return <SessionContext.Provider value={session}>{children}</SessionContext.Provider>;
};

export default SessionProvider;
