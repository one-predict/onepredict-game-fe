import { createContext, useMemo, ReactNode } from 'react';
import { User } from '@api/UserApi';

export interface SessionProviderProps {
  children: ReactNode;
  currentUser: User | null | undefined;
}

export interface SessionValue {
  currentUser: User | null | undefined;
}

export const SessionContext = createContext<SessionValue>({} as SessionValue);

export const SessionProvider = ({ children, currentUser }: SessionProviderProps) => {
  const session = useMemo(() => {
    return { currentUser };
  }, [currentUser]);

  return <SessionContext.Provider value={session}>{children}</SessionContext.Provider>;
};
