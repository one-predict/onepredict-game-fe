const BOT_NAME = import.meta.env.VITE_BOT_ID;
const APP_NAME = import.meta.env.VITE_APP_ID;

export const encodeStartParams = (params: Record<string, unknown>) => {
  return btoa(JSON.stringify(params));
};

export const safeDecodeStartParams = (params: string) => {
  try {
    return JSON.parse(atob(params)) as Record<string, string>;
  } catch (error) {
    return {} as Record<string, string>;
  }
};

export const generateReferralLink = (userId: string) => {
  const encodedStartParams = encodeStartParams({ referralId: userId });

  return `https://t.me/${BOT_NAME}/${APP_NAME}?startapp=${encodedStartParams}`;
};

export const generateTournamentLink = (tournamentId: string) => {
  const encodedStartParams = encodeStartParams({ initialPage: `/tournaments/${tournamentId}` });

  return `https://t.me/${BOT_NAME}/${APP_NAME}?startapp=${encodedStartParams}`;
};

export const generateShareLink = (url: string, text: string) => {
  return `https://t.me/share/url?url=${url}&text=${encodeURIComponent(text)}`;
};

export const generateShareFriendLink = (userId: string) => {
  return generateShareLink(generateReferralLink(userId), 'Try to beat my score in OnePredict!');
};

export const generateShareTournamentLink = (tournamentId: string, tournamentName: string) => {
  return generateShareLink(generateTournamentLink(tournamentId), tournamentName);
};

export const generateChannelLink = (channelId: string) => {
  return `https://t.me/${channelId}`;
};
