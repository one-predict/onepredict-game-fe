import { useEffect } from 'react';
import { useBackButton, useMiniApp } from '@telegram-apps/sdk-react';
import { useMatches, useNavigate } from '@remix-run/react';

const EXPAND_WEB_APP_EVENT = 'web_app_expand';
const BACKGROUND_COLOR = '#190A31';
const HEADER_COLOR = '#190A31';

const TelegramInit = () => {
  const miniApp = useMiniApp(true);
  const navigate = useNavigate();
  const matches = useMatches();
  const match = matches[matches.length - 1];

  const miniAppBackButton = useBackButton(true);

  const backHref = match.handle?.backHref;

  useEffect(() => {
    if (miniApp) {
      miniApp.postEvent(EXPAND_WEB_APP_EVENT);
      miniApp.setBgColor(BACKGROUND_COLOR);
      miniApp.setHeaderColor(HEADER_COLOR);
    }
  }, [miniApp]);

  useEffect(() => {
    const callback = () => {
      if (!backHref) {
        return;
      }

      navigate(backHref);
    };

    if (backHref) {
      miniAppBackButton?.on('click', callback);
      miniAppBackButton?.show();
    }

    return () => {
      miniAppBackButton?.off('click', callback);
      miniAppBackButton?.hide();
    };
  }, [miniAppBackButton, navigate, backHref]);

  return null;
};

export default TelegramInit;
