import dayjs from 'dayjs';

export const getDateFromUnixTimestamp = (timestamp: number) => {
  return dayjs.unix(timestamp).toDate();
};
