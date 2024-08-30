import { useEffect } from 'react';
import { useMiniApp } from '@telegram-apps/sdk-react';

const EXPAND_WEB_APP_EVENT = 'web_app_expand';
const BACKGROUND_COLOR = '#190A31';
const HEADER_COLOR = '#190A31';

const TelegramInit = () => {
  const miniApp = useMiniApp(true);

  useEffect(() => {
    if (miniApp) {
      miniApp.postEvent(EXPAND_WEB_APP_EVENT);
      miniApp.setBgColor(BACKGROUND_COLOR);
      miniApp.setHeaderColor(HEADER_COLOR);
    }
  }, [miniApp]);

  return null;
};

export default TelegramInit;
