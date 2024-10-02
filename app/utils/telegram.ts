const BOT_NAME = import.meta.env.VITE_BOT_ID;
const APP_NAME = import.meta.env.VITE_APP_ID;

export const generateReferralLink = (userId: string) => {
  return `https://t.me/${BOT_NAME}/${APP_NAME}?startapp=${userId}`;
};

export const generateShareLink = (userId: string) => {
  return `https://t.me/share/url?url=${generateReferralLink(userId)}&text=${encodeURIComponent('Try to beat my score in OnePredict!')}`;
};

export const generateChannelLink = (channelId: string) => {
  return `https://t.me/${channelId}`;
};
