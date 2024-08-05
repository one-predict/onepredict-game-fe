'use client';
import Script from 'next/script';

declare global {
  interface Window {
    Telegram: {
      WebApp: {
        initData: string;
      };
    };
  }
}

const TelegramWebAppScript = () => {
  return <Script strategy="beforeInteractive" id="TelegramWebApp" src="https://telegram.org/js/telegram-web-app.js" />;
};

export default TelegramWebAppScript;
