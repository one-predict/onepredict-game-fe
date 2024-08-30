/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useBackButton as useTelegramMiniBackButton } from '@telegram-apps/sdk-react';

const useBackButton = (enabled: boolean, callback: () => void, deps: unknown[]) => {
  const miniAppBackButton = useTelegramMiniBackButton(true);

  useEffect(() => {
    const escapeButtonClickCallback = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        callback();
      }
    };

    if (enabled) {
      document.body.addEventListener('keydown', escapeButtonClickCallback);
      miniAppBackButton?.on('click', callback);
      miniAppBackButton?.show();
    }

    return () => {
      if (enabled) {
        document.body.removeEventListener('keydown', escapeButtonClickCallback);
        miniAppBackButton?.off('click', callback);
        miniAppBackButton?.hide();
      }
    };
  }, [miniAppBackButton, enabled, ...deps]);
};

export default useBackButton;
