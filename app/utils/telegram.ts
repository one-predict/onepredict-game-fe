export const getReferalLink = (id: string | undefined, botName: string, appName: string) => `https://t.me/${botName}/${appName}?referralId=${id}`