import { createContext, useMemo, ReactNode } from 'react';
import { User } from '@api/UserApi';
import useCurrentUserQuery from '@hooks/queries/useCurrentUserQuery';
import useSignInMutation from '@hooks/mutations/useSignInMutation';
import useAsyncEffect from '@hooks/useAsyncEffect';
import { convertArrayBufferToHex, generateHMACSHA256 } from '@utils/crypto';

export interface SessionProviderProps {
  children: ReactNode;
}

export interface SessionValue {
  currentUser: User | null | undefined;
}

export const SessionContext = createContext<SessionValue>({} as SessionValue);

export const SessionProvider = ({ children }: SessionProviderProps) => {
  const { data } = useCurrentUserQuery();
  const { mutateAsync: signIn } = useSignInMutation();

  useAsyncEffect(async () => {
    if (import.meta.env.VITE_TELEGRAM_BOT_TOKEN_DEV) {
      const messageData: Record<string, string> = {
        user: JSON.stringify({
          id: -1,
          first_name: 'User',
          last_name: 'Test',
          username: 'test_user',
        }),
      };

      const secretKey = await generateHMACSHA256('WebAppData', import.meta.env.VITE_TELEGRAM_BOT_TOKEN_DEV);

      const messageHash = convertArrayBufferToHex(
        await generateHMACSHA256(
          secretKey,
          Object.keys(messageData)
            .sort()
            .reduce((message, key) => {
              return message ? `${message}\n${key}=${messageData[key]}` : `${key}=${messageData[key]}`;
            }, ''),
        ),
      );

      const signInMessage = new URLSearchParams({
        ...messageData,
        hash: messageHash,
      }).toString();

      await signIn(signInMessage);

      return;
    }

    await signIn(window.Telegram.WebApp.initData);
  }, []);

  const session = useMemo(() => {
    return { currentUser: data };
  }, [data]);

  return <SessionContext.Provider value={session}>{children}</SessionContext.Provider>;
};
