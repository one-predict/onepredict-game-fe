import dayjs from 'dayjs';

export const getDateFromUtcDay = (utcDay: number) => {
  const dateInMilliseconds = utcDay * 24 * 60 * 60 * 1000;

  return dayjs.utc(dateInMilliseconds).toDate();
};
