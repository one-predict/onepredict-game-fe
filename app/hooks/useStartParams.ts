import { useLaunchParams } from '@telegram-apps/sdk-react';
import { useMemo } from 'react';

const useStartParams = () => {
  const launchParams = useLaunchParams(true);

  return useMemo(() => {
    return (launchParams?.startParam || '').split('&').reduce(
      (previousStartParams, stringifiedKeyValue) => {
        const [key, value] = stringifiedKeyValue.split('=');

        if (key) {
          previousStartParams[key] = value;
        }

        return previousStartParams;
      },
      {} as Record<string, string>,
    );
  }, [launchParams]);
};

export default useStartParams;
