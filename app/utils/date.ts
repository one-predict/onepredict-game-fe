import dayjs from 'dayjs';
import { MAX_SAFE_DATE } from '@constants/date';

export const getCurrentUnixTimestamp = () => {
  return dayjs().unix();
};

export const getUnixTimestampFromDate = (date: Date | string) => {
  return dayjs(date).unix();
};

export const getDateFromUnixTimestamp = (timestamp: number) => {
  return dayjs.unix(timestamp).toDate();
};

export const getDifferenceInSeconds = (firstDate: Date, secondDate: Date) => {
  return dayjs(firstDate).diff(dayjs(secondDate), 'second');
};

export const isInfiniteDate = (date: Date) => {
  return MAX_SAFE_DATE.getTime() === date.getTime();
};
