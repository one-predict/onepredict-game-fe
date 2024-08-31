import { useEffect } from 'react';
import { useMiniApp, initSwipeBehavior } from '@telegram-apps/sdk-react';

const EXPAND_WEB_APP_EVENT = 'web_app_expand';
const BACKGROUND_COLOR = '#190A31';
const HEADER_COLOR = '#190A31';

const TelegramInit = () => {
  const miniApp = useMiniApp(true);

  const [swipeBehavior] = initSwipeBehavior();

  useEffect(() => {
    swipeBehavior.disableVerticalSwipe();
  }, [swipeBehavior]);

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
